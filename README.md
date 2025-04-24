Link to live site : https://utsav10721.vercel.app/  
 # ResumeCraft: AI-Powered Resume Builder And Analyzer

## Overview

A full-stack AI-powered resume builder that offers real-time suggestions, JD matching, and live preview for creating optimized, professional resumes.

## 🚀 Features

- 🔍 **AI-Powered Resume Analysis**  
  Leverages Gemini API for smart, real-time suggestions based on job descriptions.

- 🎯 **JD Matching & Keyword Optimization**  
  Automatically aligns resumes with job requirements to boost relevance by 20%.

- 🛡️ **Secure Backend**  
  Built with Django and JWT authentication for managing user data and resume content safely.

- 🧩 **Customizable Templates**  
  Professional, ATS-compliant templates built using Material-UI.

- 👀 **Live Preview**  
  Instant visual feedback while editing your resume.

- 📱 **Responsive Design**  
  Seamless performance across desktop and mobile devices.


## Tech Stack

### Frontend

- React
- React Router
- CSS Modules
- material-UI

### Backend

- Django
- Django Rest Framework
- SQLite 



## Setup and Installation

### Backend Setup

```sh
# Navigate to the backend directory
cd backend

# Create a virtual environment and activate it
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Apply migrations and start the Django server
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```sh
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

---

## API Endpoints

- `POST /api/analyze-resume/` - Send resume and JD for Matching
- `POST /api/token/` - User login endpoint.
- `POST /api/register/` - User registration endpoint.

---

## Usage

1. Run the backend and frontend servers.
2. Open `http://localhost:3000` in your browser.
3. Sign up or log in to access the code editor.
4. Write and analyze code using the AI assistant.

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit changes and push to GitHub.
4. Open a pull request.


##  Need Help?

Open an issue on GitHub!

