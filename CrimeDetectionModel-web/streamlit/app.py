import streamlit as st
import requests
import pandas as pd

# Set the FastAPI endpoint
API_URL = "http://127.0.0.1:8000/predict"  # Update this URL if the API is hosted on a different server or port

# Streamlit app title
st.title("Crime Detection API 🔍")

st.write("Enter the location and year to predict the likely crime type.")

# Input fields for latitude, longitude, and year
latitude = st.number_input("Latitude", value=41.85, format="%.6f")
longitude = st.number_input("Longitude", value=-87.65, format="%.6f")
year = st.number_input("Year", value=2022, step=1, min_value=1900, max_value=2100)

# Button to make the prediction
if st.button("Predict Crime Type"):
    # Prepare the payload
    payload = {
        "latitude": latitude,
        "longitude": longitude,
        "year": year
    }
    
    try:
        # Make the request to the FastAPI endpoint
        response = requests.post(API_URL, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            crime_type = result.get("crime_type", "Unknown")
            probability = result.get("probability", 0)  # Convert to percentage
            
            # Display the result
            st.success(f"Predicted Crime Type: **{crime_type}**")
            st.info(f"Probability: **{probability:.2f}%**")
            
            # Show the location on the map
            map_data = pd.DataFrame({'lat': [latitude], 'lon': [longitude]})
            st.map(map_data)
        else:
            st.error(f"Error: Unable to get a valid response from the API (Status Code: {response.status_code})")
    except requests.exceptions.RequestException as e:
        st.error(f"Request failed: {e}")

# Instructions for running the app
st.markdown("""
**How to run the app:**
1. Make sure the FastAPI server is running locally at `http://127.0.0.1:8000`.
2. Save this script as `app.py`.
3. Run the following command in your terminal:  
   ```bash
   streamlit run app.py
""")