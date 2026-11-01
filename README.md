# Cat vs Dog Classifier

A full-stack web app that lets a user upload an image and classify it as CAT, DOG, or BOTH using a real MobileNetV2 model with a FastAPI backend and a React + TypeScript frontend.

## Project overview

This project uses:
- React + TypeScript + Vite for the frontend UI
- Tailwind CSS for styling
- FastAPI for the backend API
- MobileNetV2 pretrained on ImageNet for image classification
- Real model inference on uploaded images, with no fake or hardcoded predictions

## Features
- Upload JPG or PNG images
- Predict whether the image contains a cat, a dog, or both
- Real deep learning inference with MobileNetV2
- Frontend-backend communication via API requests
- Simple and clean UI
- CORS configured for local frontend-backend communication
- Vite proxy for local development

## Requirements

Before running the project, make sure your machine has:
- Python 3.10 or newer
- Node.js 18 or newer
- npm
- Git (optional, if cloning from a repo)

## Project structure

```text
cat-vs-dog/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
├── frontend/
│   ├── .env
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
├── README.md
└── .gitignore
```

## Quick start

### 1) Clone or unzip the project
```bash
cd path/to/project
```

### 2) Start the backend
```bash
cd backend
python -m venv venv
```

On Windows:
```bash
venv\Scripts\activate
```

On macOS/Linux:
```bash
source venv/bin/activate
```

Then install the Python dependencies:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Start the API:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The backend will run at:
- http://127.0.0.1:8000
- API docs at http://127.0.0.1:8000/docs

### 3) Start the frontend
Open a new terminal and run:
```bash
cd frontend
npm install
```

Create or confirm the environment file:
```env
VITE_API_URL=http://127.0.0.1:8000
```

Then start the frontend:
```bash
npm run dev -- --host 0.0.0.0
```

Open the app in a browser:
- http://localhost:5173

If port 5173 is already in use, Vite may choose another port such as 5174.

## Backend requirements

The backend dependencies are defined in [backend/requirements.txt](backend/requirements.txt):

```txt
fastapi>=0.110
uvicorn[standard]>=0.29
tensorflow>=2.16
pillow>=10.0
numpy>=1.26
python-multipart>=0.0.9
```

## Frontend requirements

The frontend dependencies are defined in [frontend/package.json](frontend/package.json):

- react
- react-dom
- lucide-react
- vite
- @vitejs/plugin-react
- typescript
- tailwindcss
- postcss
- autoprefixer

## API usage

### Health check
```bash
curl http://127.0.0.1:8000/
```

### Predict endpoint
```bash
curl -F "file=@cat.jpg" http://127.0.0.1:8000/predict
```

The backend returns a JSON response like:
```json
{"label": "CAT"}
```

Possible labels:
- CAT
- DOG
- BOTH

If no cat or dog is detected clearly enough, the API returns a 422 error with a descriptive message.

## Environment configuration

Frontend environment variable:
```env
VITE_API_URL=http://127.0.0.1:8000
```

This avoids the localhost IPv6 issue that sometimes causes browser fetch problems.

## Troubleshooting

### Backend does not start
- Activate the virtual environment first
- Make sure Python dependencies are installed
- Check if port 8000 is already used

### Frontend cannot reach backend
- Confirm your `.env` file contains `VITE_API_URL=http://127.0.0.1:8000`
- Confirm the backend is running
- Check browser network errors and backend logs

### Vite port is busy
Use:
```bash
npm run dev -- --host 0.0.0.0
```
If 5173 is taken, Vite will choose another port automatically.

### Activation issue on Windows
Use:
```bash
venv\Scripts\activate
```

### Activation issue on macOS/Linux
Use:
```bash
source venv/bin/activate
```

## Notes for running on another laptop or system

If you move this project to another machine:
1. Copy the whole project folder
2. Install Python dependencies in the backend virtual environment
3. Install frontend dependencies using `npm install`
4. Start the backend and frontend as shown above
5. Ensure the frontend `.env` points to `http://127.0.0.1:8000`

## License
This project is for educational and demonstration purposes.

## Summary
This application demonstrates how to combine a React frontend with a FastAPI backend and a real deep learning model for image classification. It is a practical project for learning web development, API integration, and machine learning deployment.
