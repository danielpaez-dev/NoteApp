# Aplicación de Notas Full-Stack con React y Django

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

¡Bienvenido/a a mi proyecto de notas full-stack

Note App es una aplicación web de gestión de notas que permite a los usuarios crear, editar, organizar y eliminar notas en una interfaz intuitiva y amigable. Desarrollada con una arquitectura moderna de frontend en React y backend en Django, esta aplicación demuestra la implementación de un sistema completo con autenticación, persistencia de datos y diseño responsive.

> **Nota**: Este proyecto está aún en desarrollo. Algunas funcionalidades aún no están completamente implementadas, pero la estructura básica y la autenticación ya están en marcha.

## Tecnologías Utilizadas
### Frontend

- **React**: Biblioteca **JavaScript** para construir interfaces de usuario
- **React-Bootstrap**: Framework de UI para implementar diseños responsivos
- **SCSS**: Preprocesador **CSS** para estilos avanzados
- **Auth0**: Servicio de autenticación y autorización

### Backend

- **Django**: Framework de **Python** para desarrollo web
- **SQLite**: Base de datos relacional para persistencia de datos
- **Django REST Framework**: Herramienta para construir APIs web

## Características

- Autenticación segura mediante Auth0
- Gestión completa de notas (CRUD)
- Interfaz de usuario intuitiva y responsive
- Persistencia de datos en SQLite
- Diseño moderno con React-Bootstrap y SCSS

## Requisitos Previos
Para ejecutar este proyecto, necesitarás tener instalado lo siguiente:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [Python](https://www.python.org/) (versión 3.8 o superior)
- [pip](https://pip.pypa.io/en/stable/installation/) (viene con Python)
- [Git](https://git-scm.com/) (para clonar el repositorio)

## Clonar el Repositorio
### Backend
1. Para obtener una copia local del proyecto, ejecuta el siguiente comando en tu terminal:
```bash
git clone https://github.com/danielpaez-dev/NoteApp.git
cd noteapp
```
2. Configura el entorno virtual y activarlo:
```bash
cd backend/notes
.\venv\Scripts\Activate.ps1  # En Windows PowerShell
# source venv/bin/activate  # En Unix/Linux
```
3. Instalar dependencias:
```bash
pip install -r requirements.txt
```
4. Ejecutar migraciones:
```bash
python manage.py migrate
```
5. Inicia el servidor:
```bash
python manage.py runserver
```
El backend estará disponible en http://localhost:8000.
### Frontend
1. Navegar al directorio del frontend:
```bash
cd frontend/noteapp
```
2. Instalar dependencias:
```bash
npm install
```
3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en la URL mostrada en la terminal http://localhost:5173.
