import requests

url = "http://127.0.0.1:8000/predict"
data = {
    "latitude": 41.866843668,
    "longitude": 87.649436929,
    "year": 2024
}

response = requests.post(url, json=data)
print(response.json())