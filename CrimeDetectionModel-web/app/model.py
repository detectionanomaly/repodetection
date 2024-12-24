import joblib
import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.preprocessing import StandardScaler

xgb_model = joblib.load(r'app/models/xgb_model.pkl')
scaler = joblib.load(r'app/models/scaler.pkl')
label_encoders = joblib.load(r'app/models/label_encoders.pkl')
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