# AgriWise Backend (FastAPI)

This repository contains a ready-to-run FastAPI backend for AgriWise:
- `/predict` (POST): upload leaf images for disease detection (uses a Keras model file).
- `/weather` (GET): proxy to OpenWeatherMap current weather API.
- `/market` (GET): returns mock market CSV data.
- `/users` endpoints: create/get user (stores in Firestore/Supabase if configured).

## Quick start (local)
1. Copy `.env.example` to `.env` and fill the keys.
2. Place your trained Keras model at the path set in `MODEL_PATH` (default: `models/plant_mobilenetv2.h5`) and a `labels.json` file.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the app:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
5. Open docs: http://localhost:8000/docs

## Notes & resources
- OpenWeatherMap example endpoint: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
- Firestore: you must provide a service account JSON and set `GOOGLE_APPLICATION_CREDENTIALS` before using `DB_PROVIDER=firestore`.
- Deploy: Render and Railway both support FastAPI; set the start command to `uvicorn main:app --host 0.0.0.0 --port $PORT` when configuring the service.

## What I cannot do for you
- Create cloud provider accounts (OpenWeatherMap, Firebase, Supabase, Render, Railway).
- Upload your trained model file to remote storage on your behalf.
- Push code to your GitHub account or create services in your cloud accounts.
