# Crime Detection Model 

![Crime Detection](https://img.shields.io/badge/Crime-Detection-blue)

This project provides a FastAPI microservice for predicting crime types based on latitude, longitude, and year using a pre-trained XGBoost model.


## Features
- Predict crime types based on geographical coordinates and year.
- Uses a pre-trained XGBoost model for predictions.
- Easy to integrate with other applications, including Java.

## Setup

Download the data from : https://data.cityofchicago.org/Public-Safety/Crimes-2022/9hwr-2zxp 

### Prerequisites
- Python 3.7+
- FastAPI
- Uvicorn
- Joblib
- Numpy
- Pandas
- XGBoost
- Scikit-learn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/CrimeDetection.git
   cd CrimeDetection 
   ``` 
2. Install the required packages: 
 ```sh
pip install -r requirements.txt
``` 
3. Run the FastAPI application:
 ```sh
uvicorn app.main:app --reload
```