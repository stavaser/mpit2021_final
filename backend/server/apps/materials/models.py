from django.db import models
from django.conf import settings
from apps.organizations.models import Organization

# модели вакансий

class Vacancies(models.Model):
    organization = models.ForeignKey(
        to=Organization, on_delete=models.CASCADE, db_column="organization_id", verbose_name="Организация", )
    title = models.CharField(max_length=64, db_column="title", verbose_name="Название", )
    description = models.TextField(
        null=True, blank=True, db_column="description", verbose_name="Описание", )
    is_active = models.BooleanField(default=True)

class VacancyRequirements(models.Model):
    vacancy = models.ForeignKey(
        to=Vacancies, on_delete=models.CASCADE,)
    skill = models.CharField(max_length=64)
    description = models.TextField(
        null=True, blank=True, db_column="description", verbose_name="Описание", )
    


# модели проектов

class Projects(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
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



