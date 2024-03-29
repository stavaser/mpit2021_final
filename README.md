# CONNECT IT
### MPIT 2021 FINAL
---------------------
## Docker
Скачайте репозиторий и запустите билд

```sh
git clone https://github.com/stavaser/mpit2021_final
```
```sh
cd mpit2021_final
```
```sh
docker-compose -f docker-compose-dev.yml up --build
```

Проверьте развертывание, перейдя по этому адресу сервера в
браузере.

```sh
0.0.0.0/login
```

## Запуск фронта отдельно

Установите зависимости и запустите сервер.

```sh
cd frontend
npm i
npm start
```

## Контроллеры
Находятся в файле [backend/server/api/urls.py](backend/server/api/views.py)
### Эндпоинты авторизации

1.  `accounts/token/logout/`
2.  `accounts/users/me/`
3.  `request/get_tests`
4.  `request/user_register`
5.  `request/get_user_profile`
6.  `request/org_register`

### Эндпоинты вакансий

1.  `request/get_vacancies`
2.  `request/post_vacancies`
3.  `request/get_vacancies`
4.  `request/get_org_vacancies`
5.  `request/get_vacancy_id`
6.  `request/get_vacancies`
7.  `request/get_vacancy_requests`
8.  `request/post_vacancy_request`

### Эндпоинты курсов

1.  `request/get_courses`
2.  `request/post_course`
3.  `request/get_course_media`
4.  `request/get_courses_by_skill`
5.  `request/get_org_courses`
6.  `request/get_course_skills`
7.  `request/post_finished`
8.  `request/get_finished_courses`
9.  `request/get_courses`
10. `request/get_courses`

### Эндпоинты тестов

1.  `request/get_tests`
2.  `request/post_test`

### Разное

1.  `request/get_matching_skills`


## Модели

| Название           | Описание                                    |
| ---------------- | ----------------------------------------- |
|   `UserProfile`    |        |
|   `Organization`    |        |
|   `Vacancies`    |        |
|   `JobDescription_1`    |        |
|   `JobDescription_2`    |        |
|   `JobDescription_3`    |        |
|   `VacancyRequirements`    |        |
|   `Courses`    |        |
|   `CourseSkills`    |        |
|   `CourseMedia`    |        |
|   `CourseProgress`    |        |
|   `CourseMediaProgress`    |        |
|   `Projects`    |        |
|   `Teams`    |        |
|   `Teammates`    |        |
|   `CourseMediaProgress`    |        |
|   `Tests`    |        |
|   `TestQuestion`    |        |
|   `TestAnswer`    |        |
|   `TestResult`    |        |
|   `UserSkills`    |        |
|   `Tests`    |        |




