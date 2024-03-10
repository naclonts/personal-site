A homepage in a long-form-copy layout, using Django for templates, email handling, and a markdown blog with syntax highlighting.

### Setup

Create a file "./personal_site/secret_settings.py" defining:

```python
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

Install dependencies and make the database:

```shell
mkvirtualenv homepage # optional
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```

Then start the server for development:

```shell
python manage.py runserver
```

The frontend files should be generated with:

```
webpack --watch --mode=development
```
