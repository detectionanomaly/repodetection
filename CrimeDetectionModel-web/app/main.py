from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .model import predict_crime

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class CrimePredictionRequest(BaseModel):
    latitude: float
    longitude: float
    year: int

@app.post("/predict")
def predict(request: CrimePredictionRequest):
    crime_type, probability = predict_crime(request.latitude, request.longitude, request.year)
    return {"crime_type": crime_type, "probability": probability}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)