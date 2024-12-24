import joblib
import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.preprocessing import StandardScaler

xgb_model = joblib.load(r'notebooks/xgb_model.pkl')
scaler = joblib.load(r'notebooks/scaler.pkl')
label_encoders = joblib.load(r'notebooks/label_encoders.pkl')
primary_type_encoder = label_encoders['Primary Type']

def predict_crime(latitude, longitude, year):
    input_data = pd.DataFrame([[latitude, longitude, year]], columns=['Latitude', 'Longitude', 'Year'])
    input_data = scaler.transform(input_data)
    dinput = xgb.DMatrix(input_data)
    pred_prob = xgb_model.predict(dinput)
    pred_label = np.argmax(pred_prob, axis=1)
    crime_type = primary_type_encoder.inverse_transform(pred_label)[0]
    probability = pred_prob[0][pred_label[0]] * 100
    return crime_type, probability

test_inputs = [
    (41.85, -87.65, 2022),
    (41.90, -87.70, 2021),
    (41.80, -87.60, 2020),
    (41.75, -87.55, 2019),
    (41.88, -87.68, 2023)
]

for latitude, longitude, year in test_inputs:
    crime_type, probability = predict_crime(latitude, longitude, year)
    print(f"Latitude: {latitude}, Longitude: {longitude}, Year: {year}")
    print(f"Predicted Crime Type: {crime_type} with probability: {probability:.2f}%\n")