A simple page in a long-form-copy-ish layout.

Uses Django for templates, email handling, and "minimalistic" blog. Thanks to Rafael Caferati for the [Awesome Button](https://github.com/rcaferati/awesome-button) web component!

### Setup

Create a file "./personal_site/secret_settings.py" defining:
```
# Database connection
DB_NAME = ''
DB_USER = ''
DB_PASSWORD = ''
DB_HOST = ''

# Email SMTP
EMAIL_HOST = ''
EMAIL_PORT = 587
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = True

# Misc.
PERSONAL_EMAIL = 'email to send contact form messages to'
SECRET_KEY = 'a random key'
```

Then start the server:
```shell
mkvirtualenv homepage # optional
pip install -r requirements.txt
python manage.py runserver
```
