# CMS for EUTH Project

## How to start

1. clone repository
2. cd euth_wagtail
3. create virtualenv (make sure to add virtualenv name to .gitignore)
4. run `pip install -r requirements.txt`
5. run `python manage.py migrate`
6. run `python manage.py createsuperuser`
7. run `python manage.py bower install`
8. cd home
9. run `django-admin.py compilemessages`
10. cd ..
11. run `python manage.py runserver`
12. Browse to  http://localhost:8000/admin
