import psycopg2
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import datetime
import os
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Connect to Neon Database using the connection string
DATABASE_URL =  "postgresql://paisa-tracker_owner:npg_Po5qeHBb4wrm@ep-twilight-king-a5ena0ly-pooler.us-east-2.aws.neon.tech/paisa-tracker?sslmode=require" 
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

def train_model():
    cursor.execute('SELECT "expenses"."createdAt", amount FROM expenses ORDER BY "expenses"."createdAt" ASC;')
    rows = cursor.fetchall()
    
    if len(rows) < 3:
        return None  # Model needs at least 3 records

    df = pd.DataFrame(rows, columns=["createdAt", "amount"])
    
    df["createdAt"] = pd.to_datetime(df["createdAt"], errors='coerce').astype('int64') / 10**9

    # Train Random Forest model
    X = df[["createdAt"]]
    y = df["amount"]
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model

model = train_model()

@app.route('/predict', methods=['POST'])
def predict():
    global model
    if model is None:
        return jsonify({"error": "Not enough data to train"}), 400

    req_data = request.get_json()
    start_date = pd.to_datetime(req_data["createdAt"])

    predictions = []
    for i in range(7):  # Predict next 7 days
        future_date = start_date + datetime.timedelta(days=i)
        future_timestamp = future_date.astype(int) / 10**9
        predicted_value = model.predict([[future_timestamp]])[0]
        predictions.append({
            "date": future_date.strftime("%Y-%m-%d"),
            "predicted_expense": round(predicted_value, 2)
        })

    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
