# Django Portfolio

A CMS for my portfolio built on Django.

## Usage

### 1. Install
```
mkvirtualenv portfolio --python=python3
pip install -r requirements.txt
```

### 2. Download
```
cd /path/to/workspace
git clone https://github.com/willshowell/portfolio.git
cd portfolio
```

### 3. Settings
Make a local settings file:
```
vim portfolio/local_settings.py
```
Be sure to include `SECRET\_KEY` and `DATABASES` as well as `DEBUG = True` if using for development.
See [Djano Settings](https://docs.djangoproject.com/en/1.10/topics/settings/) for more information.

### 4. Database Setup
Run the migrations to initialize the database:
```
./manage.py migrate
```
Create an admin by running:
```
./manage.py createsuperuser
```

### 5. Run
```
./manage.py runserver
```

### 6. Fill out
* Edit the `admin.site.site\_header` in `portfolio/urls.py` to your name.
* Go to `localhost:8000/admin` (or whatever address:port) and log in using your superuser credentials.
* Add new About, Experience, and Project items.
