from django.db import models
from django.conf import settings
from apps.organizations.models import Organization

# модели вакансий

class Vacancies(models.Model):
    organization = models.ForeignKey(
        to=Organization, on_delete=models.CASCADE, db_column="organization_id", verbose_name="Организация", )
    title = models.CharField(max_length=64, db_column="title", verbose_name="Название", )
    salary = models.CharField(max_length=64, default='По договору', db_column="salary", verbose_name="зп", )
    address = models.CharField(max_length=64, default='')
    schedule = models.CharField(max_length=64, default='')
    description = models.TextField(
        null=True, blank=True, db_column="description", verbose_name="Описание", )
    is_active = models.BooleanField(default=True)

class VacancyRequests(models.Model):
    vacancy = models.ForeignKey(to=Vacancies, on_delete=models.CASCADE )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE )
    phone = models.CharField(max_length=64)
    status = models.CharField(max_length=64, default='Ожидается')
    date = models.DateTimeField(auto_now_add=True, verbose_name="Дата добавления", )

# Обязанности
class JobDescription_1(models.Model):
    vacancy = models.ForeignKey(to=Vacancies, on_delete=models.CASCADE,)
    text = models.CharField(max_length=240, default='')

# Требования
class JobDescription_2(models.Model):
    vacancy = models.ForeignKey(to=Vacancies, on_delete=models.CASCADE,)
    text = models.CharField(max_length=240, default='')

# Условия
class JobDescription_3(models.Model):
    vacancy = models.ForeignKey(to=Vacancies, on_delete=models.CASCADE,)
    text = models.CharField(max_length=240)


class VacancyRequirements(models.Model):
    vacancy = models.ForeignKey(to=Vacancies, on_delete=models.CASCADE,)
    skill = models.CharField(max_length=64)
    description = models.TextField(
        null=True, blank=True, db_column="description", verbose_name="Описание", )

# модели курсов

class Courses(models.Model):
    organization = models.ForeignKey(to=Organization,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=64, db_column="title", verbose_name="Название", )
    description = models.TextField(null=True, blank=True, db_column="description", verbose_name="Описание", )
    is_active = models.BooleanField(default=True)

class CourseSkills(models.Model):
    course = models.ForeignKey(to=Courses, on_delete=models.CASCADE)
    skill = models.TextField(null=True, blank=True, db_column="skill", verbose_name="skill", )

class CourseMedia(models.Model):
    course = models.ForeignKey(to=Courses, on_delete=models.CASCADE)
    title = models.CharField(max_length=64, db_column="title", verbose_name="Название", )
    description = models.TextField(null=True, blank=True, db_column="description", verbose_name="Описание", )
    video = models.CharField(max_length=240)

class CourseProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(to=Courses, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not CourseProgress.objects.filter(user=self.user, course=self.course).exists():
            super().save(*args, **kwargs)


class CourseMediaProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    CourseMedia = models.ForeignKey(to=CourseMedia, on_delete=models.CASCADE)

# модели проектов

class Projects(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=64, db_column="title", verbose_name="Название", )
    skill = models.CharField(max_length=64)
    description = models.TextField(
        null=True, blank=True, db_column="description", verbose_name="Описание", )

class Teams(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=64, db_column="title", verbose_name="Название", )
    link = models.CharField( null=True, blank=True, max_length=64)
    description = models.TextField(
        null=True, blank=True, db_column="description", verbose_name="Описание", )


class Teammates(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    team = models.ForeignKey(to=Teams,
                             on_delete=models.CASCADE)


# модели тестов

class Tests(models.Model):
    organization = models.ForeignKey(
        to=Organization, on_delete=models.CASCADE, db_column="organization_id", verbose_name="Организация", )
    title = models.CharField(max_length=64, db_column="title", verbose_name="Название", )
    skill = models.CharField(max_length=64)
    points = models.IntegerField(default=0)
    description = models.TextField(
        null=True, blank=True, db_column="description", verbose_name="Описание", )

class TestQuestion(models.Model):
    test = models.ForeignKey(to=Tests, on_delete=models.CASCADE)
    title = models.TextField(default="")
    text = models.TextField(default="")

class TestAnswer(models.Model):
    question = models.ForeignKey(TestQuestion, on_delete=models.CASCADE)
    text = models.TextField(default="")
    correct = models.BooleanField(default=False)

class TestResult(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    question = models.ForeignKey(TestQuestion, on_delete=models.CASCADE)
    correct = models.BooleanField(default=False)


# модели пользователя

class UserSkills(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    skill = models.CharField(max_length=64)

