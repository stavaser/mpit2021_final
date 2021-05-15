from django.contrib import admin

from apps.materials.models import *
from apps.organizations.models import Organization


admin.site.register(Organization)
admin.site.register(Vacancies)
admin.site.register(JobDescription_1)
admin.site.register(JobDescription_2)
admin.site.register(JobDescription_3)
admin.site.register(VacancyRequirements)

admin.site.register(Courses)
admin.site.register(CourseSkills)
admin.site.register(CourseMedia)
admin.site.register(CourseProgress)
admin.site.register(CourseMediaProgress)

admin.site.register(Projects)
admin.site.register(Teams)
admin.site.register(Teammates)

admin.site.register(Tests)
admin.site.register(TestQuestion)
admin.site.register(TestAnswer)
admin.site.register(TestResult)

admin.site.register(UserSkills)


