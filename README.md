# Full-Stack Notes Application with React and Django

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

[Español](README-es.md)

Welcome to my full-stack notes project!

Note App is a web application for note management that allows users to create, edit, organize, and delete notes through an intuitive and user-friendly interface. Developed with a modern architecture featuring React on the frontend and Django on the backend, this application demonstrates the implementation of a complete system with authentication, data persistence, and responsive design.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces
- **React-Bootstrap**: UI framework for implementing responsive designs
- **SCSS**: CSS preprocessor for advanced styling
- **Auth0**: Authentication and authorization service

### Backend

- **Django**: Python framework for web development
- **SQLite**: Relational database for data persistence
- **Django REST Framework**: Tool for building web APIs

## Features

- Secure authentication through Auth0
- Complete note management (CRUD)
- Intuitive and responsive user interface
- Data persistence in SQLite
- Modern design with React-Bootstrap and SCSS

## Prerequisites

To run this project, you'll need to have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Python](https://www.python.org/) (version 3.8 or higher)
- [pip](https://pip.pypa.io/en/stable/installation/) (comes with Python)
- [Git](https://git-scm.com/) (to clone the repository)

## Cloning the Repository

### Backend

1. To get a local copy of the project, run the following command in your terminal:

```bash
git clone https://github.com/danielpaez-dev/NoteApp.git
cd noteapp
```

2. Set up the virtual environment and activate it:

```bash
cd backend/notes
.\venv\Scripts\Activate.ps1  # On Windows PowerShell
# source venv/bin/activate  # On Unix/Linux
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run migrations:

```bash
python manage.py migrate
```

5. Start the server:

```bash
python manage.py runserver
```

The backend will be available at http://localhost:8000.

### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend/noteapp
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at the URL shown in the terminal http://localhost:5173.
