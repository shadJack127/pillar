# RAG Web App Hosted on the Cloud

**Access the web app at:** [https://pillar-5d510.web.app/](https://pillar-5d510.web.app/)

## Overview

This project implements a Retrieval-Augmented Generation (RAG) pipeline in a web application. Users can ask questions, and the app retrieves relevant data from a knowledge base to generate accurate and context-aware responses using GPT-4. The frontend is hosted on Firebase, and the backend is deployed on Google Cloud Run.

---

## Technologies Used

### **Frontend**
- **React.js:** A JavaScript library for building the user interface.
- **Firebase Hosting:** A platform for hosting the frontend web application.

### **Backend**
- **FastAPI:** A Python web framework for handling API requests.
- **LangChain:** A framework to implement the RAG pipeline by combining document retrieval and language model interactions.
- **Uvicorn:** A server to run the FastAPI application.
- **InMemoryVectorStore (LangChain):** A vector store to index and search documents based on their similarity to user queries.
- **OpenAI API:** To use the GPT-4 language model for generating responses.

### **Cloud Deployment**
- **Docker:** To package the application into a portable container.
- **Google Cloud Run:** A serverless platform to deploy and run the backend container.
- **Firebase Hosting:** To deploy and host the frontend.

---

## Step-by-Step Development

### **1. Data Preparation**
- Implemented a LangChain-based Retrieval-Augmented Generation (RAG) model to serve as the knowledge base for the application.

### **2. Backend Development**
- **FastAPI Setup:** Created an API endpoint (`/ask`) to handle user questions.
- **RAG Pipeline:** 
  - Retrieve relevant documents from the vector store.
  - Generate responses using GPT-4 and the retrieved documents as context.
- Debugged and tested the pipeline locally to ensure proper functionality.
- **Technologies Used:** Python, LangChain, OpenAI API, FastAPI, Uvicorn.

### **3. Frontend Development**
- Designed a simple chat interface using React.js:
  - Input box for user questions.
  - Chat history to display both user questions and app responses.
- Connected the frontend to the backend via API calls using the `fetch` method.
- Deployed the frontend to Firebase Hosting for public access.

### **4. Cloud Deployment**
- **Backend Deployment:**
  - Containerized the backend using Docker.
  - Pushed the Docker image to Google Cloud's container registry.
  - Deployed the backend container to Google Cloud Run.
- **Frontend Deployment:**
  - Built the React app.
  - Deployed the frontend to Firebase Hosting.

---

## How the App Works

1. **User Interaction:**  
   Users type a question into the web app's input box.
   
2. **Backend Processing:**  
   The frontend sends the question to the backend API. The backend retrieves relevant documents from the knowledge base and generates a response using GPT-4.

3. **Answer Display:**  
   The backend sends the response to the frontend, which displays it in the chat interface.

---

## Requirements

### **Development Tools**
- Python 3.12+
- Node.js and npm (for the React.js frontend)
- Docker (for containerization)

### **APIs and Libraries**
- OpenAI API
- LangChain
- FastAPI
- React.js

### **Cloud Platforms**
- Google Cloud Run (for backend)
- Firebase Hosting (for frontend)

---

## Deployment Steps

### **Backend Deployment**
1. Build a Docker image for the FastAPI backend.
2. Push the Docker image to Google Cloud's container registry.
3. Deploy the container to Google Cloud Run.

### **Frontend Deployment**
1. Build the React app using npm.
2. Deploy the frontend to Firebase Hosting.

---

## Project Features

1. **Chat Interface:**  
   Users can ask questions and receive immediate, contextually accurate answers.

2. **RAG Pipeline:**  
   Combines document retrieval and language generation for intelligent responses.

3. **Scalable Deployment:**  
   Deployed using Google Cloud Run and Firebase Hosting for global accessibility.

---

## Challenges and Solutions

1. **Challenge:** Connecting the frontend and backend.  
   **Solution:** Used CORS middleware in FastAPI to enable secure communication. Initially this caused issues with the RAG deployment and caused the RAG to ignore the conent passed to it. By moving the implementation in file, the problem was sorted. 
   
3. **Challenge:** connecting the frontend and backend through the cloud.  
   **Solution:** the inital solution had the backend locally hosted and that caused issues when my machine was turned off. thus to fix this i hosted the backend on the cloud as well and earned to connect the two.

---

## Access the Web App

Visit the live application at [https://pillar-5d510.web.app/](https://pillar-5d510.web.app/).
