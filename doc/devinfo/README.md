# DevInfo ComponentsVault

[[_TOC_]]

## Overall Structure

_ToDo_


## Setup Backend Environment

Create virtual environment and activate it

```
# Windows
py3 -m venv .venv
.venv\scripts\activate
```

Update pip and install django, Rest Framework and JWT. Then freeze

```
pip install --upgrade pip
pip install django
pip install djangorestframework djangorestframework-simplejwt
pip freeze > requirements.txt 

# or load it directly from requirements.txt
pip install -r requirements.txt
```

start server using

```
python manage.py runserver
```

Install MariaDB on FreeBSD

```
pkg install mariadb114-server mariadb114-client
service mysql-server start
mariadb-upgrade
```

## Setup Frontend Environment

React (JavaScript + SWC)

```
npm install axios react-router-dom jwt-decode
```

