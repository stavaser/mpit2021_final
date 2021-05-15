from django.shortcuts import render
from apps.accounts.models import UserProfile
from apps.organizations.models import Organization
from apps.materials.models import *
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
import json

@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def user_login(request):
    result = {}
    user_data = json.loads(request.body)
    if 'password' in user_data and user_data['password']:
        password = user_data['password']
    if 'username' in user_data and user_data['username']:
        username = user_data['username']
    user = User.objects.get(username=username)
    org = Organization.objects.filter(user=user).exists()
    if not user:
        return Response({'error':'no user'})
    elif user_data['is_org'] != org:
        return Response({'error':'no org or user'})
    token, _ = Token.objects.get_or_create(user=user)
    result['token'] = token.key
    result['name'] = user.username
    result['isOrg'] = org
    return Response(result)

@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def user_register(request):
    result = {}
    user_data = json.loads(request.body)
    if 'password' in user_data and user_data['password']:
        user = User()
        user.password = user_data['password']
    if 'username' in user_data and user_data['username']:
        user.username = user_data['username']
   
    profile = UserProfile()
    profile.user = user
    profile.name = user_data['username']
    profile.last_name = user_data['last_name']

    user.save()
    token = Token.objects.create(user=user)
    token.save()
    profile.save()
    
    result["points"] = profile.points
    result["name"] = profile.name
    result["token"] = token.key
    return Response(result, content_type="application/json")

@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@csrf_exempt
def org_register(request):
    result = {}
    user_data = json.loads(request.body)
    if 'password' in user_data and user_data['password']:
        user = User()
        user.password = user_data['password']
    if 'username' in user_data and user_data['username']:
        user.username = user_data['username']
    organization = Organization()
    organization.user = user
    organization.email = user_data['email']
    organization.title = user_data['title']
    organization.address = user_data['address']
    # organization.website = user_data['website']
    user.save()
    token = Token.objects.create(user=user)
    token.save()
    organization.save()
    result["name"] = organization.title
    result["token"] = token.key
    return Response(result, content_type="application/json")

@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_org_vacancies(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        if 'Authorization' in request.headers:
            token = Token.objects.get(key=request.headers['Authorization'])
            organization = Organization.objects.get(user=token.user)
            if organization:
                vacancies = Vacancies.objects.filter(organization=organization).order_by('-pk')
                json_result = []
                for vacancy in vacancies:
                    final_json = {}
                    final_json['id'] = vacancy.pk
                    final_json['organization'] = vacancy.organization.title
                    final_json['title'] = vacancy.title
                    final_json['description'] = vacancy.description
                    final_json['is_active'] = vacancy.is_active
                    reqs_result = []
                    vacancyRequirements = VacancyRequirements.objects.filter(vacancy=vacancy)
                    for req in vacancyRequirements:
                        req_json = {}
                        req_json['skill'] = req.skill
                        req_json['description'] = req.description
                        reqs_result.append(req_json)
                    final_json['reqs'] = reqs_result
                    json_result.append(final_json)
                result['result'] = json_result
                return Response(result, content_type="application/json")
            else:
                errors.append('no org')
        else:
            errors.append('no token')
    return Response({'error':errors})

@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_vacancy_id(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        if 'vacancy_id' in user_data and user_data['vacancy_id']:
            vacancy = Vacancies.objects.get(pk=user_data['vacancy_id'])
            final_json = {}
            final_json['id'] = vacancy.pk
            final_json['organization'] = vacancy.organization.title
            final_json['title'] = vacancy.title
            final_json['description'] = vacancy.description
            vacancyRequirements = VacancyRequirements.objects.filter(vacancy=vacancy)
            reqs_result = []
            for req in vacancyRequirements:
                req_json = {}
                req_json['skill'] = req.skill
                req_json['description'] = req.description
                reqs_result.append(req_json)
            final_json['reqs'] = reqs_result
            # result['result'] = final_json
            return Response(final_json, content_type="application/json")
        return Response({'error':'no vacancy_id'})
        

@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_vacancies(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        vacancies = Vacancies.objects.filter(is_active=True).order_by('-pk')
        json_result = []
        for vacancy in vacancies:
            final_json = {}
            final_json['id'] = vacancy.pk
            final_json['organization'] = vacancy.organization.title
            final_json['title'] = vacancy.title
            final_json['description'] = vacancy.description
            reqs_result = []
            vacancyRequirements = VacancyRequirements.objects.filter(vacancy=vacancy)
            for req in vacancyRequirements:
                req_json = {}
                req_json['skill'] = req.skill
                req_json['description'] = req.description
                reqs_result.append(req_json)
            final_json['reqs'] = reqs_result
            json_result.append(final_json)

        result['result'] = json_result
        return Response(result, content_type="application/json")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def post_vacancies(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        if 'Authorization' in request.headers:
            token = Token.objects.get(key=request.headers['Authorization'])
            organization = Organization.objects.get(user=token.user)
            if organization:
                vacancy = Vacancies()
                vacancy.organization = organization
                vacancy.title = user_data['title']
                vacancy.description = user_data['description']
                vacancy.is_active = user_data['is_active']
                vacancy.save()
                if 'reqs_list'in user_data and user_data['reqs_list']:
                    for req in user_data['reqs_list']:
                        reqs = VacancyRequirements()
                        reqs.vacancy = vacancy
                        reqs.skill = req['skill']
                        reqs.description = req['description']
                        reqs.save()

                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

# контроллеры курсов


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def post_course(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        if 'Authorization' in request.headers:
            token = Token.objects.get(key=request.headers['Authorization'])
            organization = Organization.objects.get(user=token.user)
            if organization:
                course = Courses()
                course.organization = organization
                course.title = user_data['title']
                course.description = user_data['description']
                course.save()
                for skill_title in user_data['skills']:
                    skill = CourseSkills()
                    skill.course = course
                    skill.skill = skill_title
                    skill.save()

                if 'media_list'in user_data and user_data['media_list']:
                    for media in user_data['media_list']:
                        course_media = CourseMedia()
                        course_media.course = course
                        course_media.title = media['title']
                        course_media.description = media['description']
                        course_media.video = media['video']
                        course_media.save()

                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_org_courses(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        token = Token.objects.get(key=request.headers['Authorization'])
        organization = Organization.objects.get(user=token.user)
        courses = Courses.objects.filter(organization=organization).order_by('-pk')
        json_result = []
        for course in courses:
            final_json = {}
            final_json['id'] = course.pk
            final_json['organization'] = course.organization.title
            final_json['title'] = course.title
            final_json['description'] = course.description
            media_count = CourseMedia.objects.filter(course=course).count()
            final_json['media_count'] = media_count
            json_result.append(final_json)

        result['result'] = json_result
        return Response(result, content_type="application/json")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_courses(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        token = Token.objects.get(key=request.headers['Authorization'])
        user = token.user
        courses = Courses.objects.filter(is_active=True).order_by('-pk')
        json_result = []
        for course in courses:
            final_json = {}
            final_json['id'] = course.pk
            final_json['organization'] = course.organization.title
            final_json['title'] = course.title
            final_json['description'] = course.description
            media_count = CourseMedia.objects.filter(course=course).count()
            final_json['media_count'] = media_count
            final_json['finished'] = CourseProgress.objects.filter(course=course, user=user).exists()
            json_result.append(final_json)

        result['result'] = json_result
        return Response(result, content_type="application/json")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_courses_by_skill(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        token = Token.objects.get(key=request.headers['Authorization'])
        user = token.user
        for skill_title in user_data['skills']:
            skills = CourseSkills.objects.filter(skill=skill_title)
            skills_result = []
            for skill in skills:
                skills_json = {}
                courses = Courses.objects.filter(is_active=True, pk=skill.course.pk).order_by('-pk')
                json_result = []
                for course in courses:
                    final_json = {}
                    final_json['id'] = course.pk
                    final_json['organization'] = course.organization.title
                    final_json['title'] = course.title
                    final_json['description'] = course.description
                    media_count = CourseMedia.objects.filter(course=course).count()
                    final_json['media_count'] = media_count
                    final_json['finished'] = CourseProgress.objects.filter(course=course, user=user).exists()
                    json_result.append(final_json)
        result['result'] = json_result
        return Response(result, content_type="application/json")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_course_skills(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        skills = CourseSkills.objects.order_by().values('skill').distinct()
        skills_result = []
        for skill in skills:
            skills_result.append(skill['skill'])
        result['result'] = skills_result
        return Response(result)

@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def post_finished(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        token = Token.objects.get(key=request.headers['Authorization'])
        user = token.user
        course = Courses.objects.get(pk=user_data['course_id'])
        courseProgress = CourseProgress()
        courseProgress.user = user
        courseProgress.course = course
        courseProgress.save()
        return Response(status=status.HTTP_200_OK)
       
@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_course_media(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        courses = Courses.objects.get(pk=user_data['course_id'])
        json_result = []
        final_json = {}
        final_json['id'] = course.pk
        final_json['organization'] = course.organization.title
        final_json['title'] = course.title
        final_json['description'] = course.description
        reqs_result = []
        courseMedia = CourseMedia.objects.filter(course=course)
        for media in courseMedia:
            req_json = {}
            req_json['title'] = media.title
            req_json['description'] = media.description
            req_json['video'] = media.video
            reqs_result.append(req_json)
        final_json['media'] = reqs_result
        result = final_json
        return Response(result, content_type="application/json")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)



# контроллеры тестов

@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def get_tests(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        if user_data['test_id'] in user_data and user_data['test_id']:
            tests = Tests.objects.all()
            json_result = []
            for test in tests:
                json = {}
                json['id'] = test.pk
                json['organization'] = test.organization.title
                json['skill'] = test.skill
                json['description'] = test.description
                json['points'] = test.points
                questions = TestQuestion.objects.filter(test=test)
                questions_result = []
                for q in questions:
                    q_json = {}
                    q_json['title'] = q.title
                    q_json['text'] = q.text
                    a_result = []
                    for a in q:
                        a_json = {}
                        a_json['text'] = a.text
                        a_json['correct'] = a.correct
                        a_result.append(a_json)
                    q_json['answers'] = a_result
                    questions_result.append(q_json)
                json['questions'] = questions_result
                json_result.append(json)
            result['result'] = json_result
            return Response(result, content_type="application/json")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def post_test(request):
    result = {}
    errors = []
    if request.method == 'POST' and request.body:
        user_data = json.loads(request.body)
        if user_data['user_id'] in user_data and user_data['user_id']:
            organization = Organization.objects.get(pk=user_data['user_id'])
            if organization:

                test = Tests()
                test.organization = organization
                test.title = user_data['title']
                test.skill = user_data['skill']
                test.points = user_data['points']
                test.description = user_data['description']
                test.save()

                question = TestQuestion()
                question.test = test
                question.title = title
                question.text = text
                question.save()

                answer = TestAnswer()
                answer.question = question
                answer.text = text
                answer.correct = correct
                answer.save()
                
                return Response(status=HTTP_200_OK)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
