# Django Portfolio

A CMS for my portfolio built on Django.

## Usage

### 1. Download
```
cd /path/to/workspace
git clone https://github.com/willshowell/portfolio.git
cd portfolio
```

### 2. Install
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
Be sure to include `SECRET_KEY` and `DATABASES` as well as `DEBUG = True` if using for development.
See [Django Settings](https://docs.djangoproject.com/en/1.10/topics/settings/) for more information.

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
* Edit the `admin.site.site_header` in `portfolio/urls.py` to your name.
* Go to `localhost:8000/admin` (or whatever address:port) and log in using your superuser credentials.
* Add new About, Experience, and Project items.


## Notes
As this project is still a work in progress, there are a few things that will need to be updated
to match your personal use, as they aren't a part of the CMS.

1. The [header and footer](portfolioapp/templates/portfolio/partials/base_page.html) are hardcoded with my name
2. The [500 error](portfolioapp/templates/500.html) page has a hardcoded social link
3. The [about page](portfolioapp/templates/portfolio/about.html) has my social links hardcoded
4. The [static images](portfolioapp/static/portfolio/images) are all specifically relevant to me and should
be replaced. Ideally file upload and/or image CDNs would be used.

