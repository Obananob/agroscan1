AgroScan – AI-Powered Plant Disease Detection

Hackathon Project Submission

AgroScan is an AI-driven web platform designed to help farmers identify plant leaf diseases quickly and accurately. By combining a custom-trained deep learning model with a modern web interface and automated treatment-generation system, AgroScan provides accessible crop health intelligence for farmers, agronomists, and agricultural stakeholders.


---

Overview

AgroScan allows users to upload or capture an image of a plant leaf, detects the disease using a TensorFlow-based convolutional neural network (CNN), and then generates treatment guidance using an AI text generation workflow. The goal is to enable farmers to make fast, informed decisions that reduce crop losses and improve productivity.


---

Key Features

1. AI Disease Detection

Custom CNN model trained on a Kaggle dataset of plant leaf diseases.

Covers 13 disease classes.

Trained for 100 epochs, achieving approximately 98% accuracy.

Exported as a .keras file and served through a FastAPI backend.


2. Modern Web Interface

Built using Lovable’s Next.js generator.

Fully responsive and mobile-friendly.

Landing page and streamlined "Get Started" workflow.

Two input modes:

Upload an image from device

Capture a leaf image using the device camera (live preview and retake options)



3. Real-Time Predictions

Images are sent to a FastAPI server deployed on Render.

The backend loads the CNN model, processes the image, and returns a JSON response identifying the disease and its confidence score.


4. Automated Treatment Advice

After prediction, disease information is forwarded to a Make.com webhook.

A language model generates practical, field-safe treatment recommendations based on the detected disease.

Advice is returned to the frontend and displayed to the user.



---

Architecture

AgroScan uses a distributed architecture optimized for speed, maintainability, and modularity.

User (Vercel Frontend)
      →
Upload / Camera Capture
      →
FastAPI Backend (Render)
      →
TensorFlow CNN Model (agroscanmodel.keras)
      →
Disease Prediction (JSON)
      →
Make.com Webhook
      →
AI Treatment Advice
      →
Displayed Back to User


---

CNN Model Details

Framework: TensorFlow / Keras

Model file: agroscanmodel.keras

Input resolution: 224 × 224 RGB

Preprocessing: normalization (/255)

Classes: includes tomato, pepper, maize, potato diseases, and healthy category

Achieved approximately 98% validation accuracy



---

FastAPI Prediction Output Example

POST /predict

Response:

{
  "disease": "Tomato Late Blight",
  "confidence": 0.9741
}


---

Technology Stack

Frontend

Next.js (Lovable-generated)

React

TailwindCSS

Deployed on Vercel


Backend

FastAPI

TensorFlow / Keras

Pillow

NumPy

Deployed on Render


AI Treatment Layer

Make.com automated workflow

LLM-generated advisory text



---

Local Development

Backend Setup

pip install fastapi uvicorn tensorflow pillow numpy
uvicorn main:app --reload

Frontend Setup

npm install
npm run dev


---

Real-World Impact

AgroScan supports farmers by enabling early disease detection, improving decision-making, reducing crop damage, and promoting sustainable farming practices. This contributes to food security and affordable access to precision agriculture tools.


---

Future Enhancements

User accounts with saved scan history

Multi-language interface and translations

GPS-based disease context

Weather-integrated disease risk level

Offline image capture and offline-first mode

Support for additional crops and diseases

PDF export of plant health reports

Premium advisory tiers



---

Author

Oni-Bashir Atiatunnasir Arike
Project: AgroScan
