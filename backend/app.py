from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

INITIAL_MEDICINES = [
    # Fever
    {"category": "Fever", "name": "Dolo 650", "mg": "650 mg", "combination": "Paracetamol IP 650 mg", "use": "Fever, headache, body pain", "tabletRate": 2.5, "sheetRate": 35.0, "course": "As advised by doctor"},
    {"category": "Fever", "name": "Paracetamol", "mg": "500 mg", "combination": "Paracetamol 500 mg", "use": "Fever and pain", "tabletRate": 2.0, "sheetRate": 25.0, "course": "As prescribed"},
    {"category": "Fever", "name": "Calpol 500", "mg": "500 mg", "combination": "Paracetamol 500 mg", "use": "Fever relief", "tabletRate": 1.8, "sheetRate": 25.0, "course": "As prescribed"},
    # BP
    {"category": "BP", "name": "Amlodipine", "mg": "5 mg", "combination": "Amlodipine", "use": "Blood pressure", "tabletRate": 3.0, "sheetRate": 35.0, "course": "Daily"},
    {"category": "BP", "name": "Telmisartan", "mg": "40 mg", "combination": "Telmisartan", "use": "Blood pressure", "tabletRate": 5.5, "sheetRate": 80.0, "course": "Daily"},
    {"category": "BP", "name": "Losartan", "mg": "50 mg", "combination": "Losartan Potassium", "use": "Hypertension", "tabletRate": 4.0, "sheetRate": 55.0, "course": "Daily"},
    # Motions
    {"category": "Motions", "name": "ORS", "mg": "Sachet", "combination": "Oral Rehydration Salts", "use": "Dehydration", "tabletRate": 0.0, "sheetRate": 25.0, "course": "Mix in water"},
    {"category": "Motions", "name": "Loperamide", "mg": "2 mg", "combination": "Loperamide HCL", "use": "Loose motions", "tabletRate": 3.0, "sheetRate": 30.0, "course": "As prescribed"},
    {"category": "Motions", "name": "Enterogermina", "mg": "5 ml", "combination": "Bacillus Clausii", "use": "Gut health", "tabletRate": 0.0, "sheetRate": 45.0, "course": "As prescribed"},
    # Thyroid
    {"category": "Thyroid", "name": "Thyronorm", "mg": "50 mcg", "combination": "Levothyroxine", "use": "Hypothyroidism", "tabletRate": 6.0, "sheetRate": 60.0, "course": "Before breakfast"},
    {"category": "Thyroid", "name": "Eltroxin", "mg": "50 mcg", "combination": "Levothyroxine", "use": "Thyroid disorder", "tabletRate": 5.0, "sheetRate": 55.0, "course": "Daily"},
    # Orthopedic
    {"category": "Orthopedic", "name": "Calcium Tablets", "mg": "500 mg", "combination": "Calcium + D3", "use": "Bone strength", "tabletRate": 4.0, "sheetRate": 45.0, "course": "Daily"},
    {"category": "Orthopedic", "name": "Pain Relief Gel", "mg": "Tube", "combination": "Diclofenac Gel", "use": "Joint pain", "tabletRate": 0.0, "sheetRate": 120.0, "course": "External use"},
    {"category": "Orthopedic", "name": "Vitamin D3", "mg": "60000 IU", "combination": "Cholecalciferol", "use": "Vitamin D deficiency", "tabletRate": 25.0, "sheetRate": 250.0, "course": "Weekly"},
    # Brain Issues
    {"category": "Brain Issues", "name": "Citicoline", "mg": "500 mg", "combination": "Citicoline Sodium", "use": "Brain support", "tabletRate": 18.0, "sheetRate": 180.0, "course": "As prescribed"},
    {"category": "Brain Issues", "name": "Donepezil", "mg": "5 mg", "combination": "Donepezil", "use": "Memory disorders", "tabletRate": 12.0, "sheetRate": 120.0, "course": "As prescribed"},
    # Migraine
    {"category": "Migraine", "name": "Sumatriptan", "mg": "50 mg", "combination": "Sumatriptan", "use": "Migraine", "tabletRate": 10.0, "sheetRate": 100.0, "course": "As advised"},
    {"category": "Migraine", "name": "Naproxen", "mg": "500 mg", "combination": "Naproxen", "use": "Migraine pain", "tabletRate": 8.0, "sheetRate": 80.0, "course": "As advised"},
    # Headache
    {"category": "Headache", "name": "Saridon", "mg": "Tablet", "combination": "Pain Relief", "use": "Headache", "tabletRate": 4.0, "sheetRate": 40.0, "course": "As needed"},
    {"category": "Headache", "name": "Crocin", "mg": "500 mg", "combination": "Paracetamol", "use": "Headache", "tabletRate": 3.0, "sheetRate": 30.0, "course": "As needed"},
    {"category": "Headache", "name": "Aspirin", "mg": "75 mg", "combination": "Aspirin", "use": "Pain relief", "tabletRate": 2.0, "sheetRate": 20.0, "course": "As prescribed"},
    # ENT
    {"category": "ENT", "name": "Ear Drops", "mg": "Drops", "combination": "Antibiotic Drops", "use": "Ear pain", "tabletRate": 0.0, "sheetRate": 70.0, "course": "As advised"},
    {"category": "ENT", "name": "Nasal Spray", "mg": "Spray", "combination": "Saline Spray", "use": "Nasal blockage", "tabletRate": 0.0, "sheetRate": 90.0, "course": "As advised"},
    {"category": "ENT", "name": "Mouth Gel", "mg": "Gel", "combination": "Oral Gel", "use": "Mouth ulcers", "tabletRate": 0.0, "sheetRate": 60.0, "course": "External use"},
    # Heart
    {"category": "Heart", "name": "Ecosprin", "mg": "75 mg", "combination": "Aspirin", "use": "Heart protection", "tabletRate": 5.0, "sheetRate": 50.0, "course": "Daily"},
    {"category": "Heart", "name": "Atorvastatin", "mg": "10 mg", "combination": "Atorvastatin", "use": "Cholesterol", "tabletRate": 6.0, "sheetRate": 65.0, "course": "Daily"},
    {"category": "Heart", "name": "Clopidogrel", "mg": "75 mg", "combination": "Clopidogrel", "use": "Blood thinner", "tabletRate": 8.0, "sheetRate": 85.0, "course": "Daily"},
    # Lung Care
    {"category": "Lung Care", "name": "Asthalin", "mg": "Inhaler", "combination": "Salbutamol", "use": "Asthma", "tabletRate": 0.0, "sheetRate": 160.0, "course": "As prescribed"},
    {"category": "Lung Care", "name": "Budecort", "mg": "Inhaler", "combination": "Budesonide", "use": "Asthma", "tabletRate": 0.0, "sheetRate": 220.0, "course": "As prescribed"},
    {"category": "Lung Care", "name": "Montelukast", "mg": "10 mg", "combination": "Montelukast", "use": "Allergy", "tabletRate": 7.0, "sheetRate": 75.0, "course": "Daily"},
    # Skin Care
    {"category": "Skin Care", "name": "Cetaphil", "mg": "100 ml", "combination": "Moisturizer", "use": "Skin care", "tabletRate": 0.0, "sheetRate": 250.0, "course": "External use"},
    {"category": "Skin Care", "name": "Antifungal Cream", "mg": "Cream", "combination": "Clotrimazole", "use": "Fungal infection", "tabletRate": 0.0, "sheetRate": 85.0, "course": "External use"},
    {"category": "Skin Care", "name": "Moisturizer", "mg": "100 ml", "combination": "Skin Lotion", "use": "Dry skin", "tabletRate": 0.0, "sheetRate": 180.0, "course": "External use"},
    # IV Sets & Fluids
    {"category": "IV Sets & Fluids", "name": "Normal Saline", "mg": "500 ml", "combination": "NaCl 0.9%", "use": "IV Fluid", "tabletRate": 0.0, "sheetRate": 60.0, "course": "Medical use"},
    {"category": "IV Sets & Fluids", "name": "RL Fluid", "mg": "500 ml", "combination": "Ringer Lactate", "use": "IV Fluid", "tabletRate": 0.0, "sheetRate": 75.0, "course": "Medical use"},
    {"category": "IV Sets & Fluids", "name": "IV Set", "mg": "Set", "combination": "Infusion Set", "use": "IV Administration", "tabletRate": 0.0, "sheetRate": 35.0, "course": "Medical use"},
    # Urinary Sets
    {"category": "Urinary Sets", "name": "Urine Bag", "mg": "2000 ml", "combination": "Urine Collection Bag", "use": "Urine collection", "tabletRate": 0.0, "sheetRate": 120.0, "course": "Medical use"},
    {"category": "Urinary Sets", "name": "Catheter", "mg": "Size 16", "combination": "Foley Catheter", "use": "Urinary care", "tabletRate": 0.0, "sheetRate": 150.0, "course": "Medical use"},
    {"category": "Urinary Sets", "name": "Urobag", "mg": "2000 ml", "combination": "Drainage Bag", "use": "Urinary collection", "tabletRate": 0.0, "sheetRate": 140.0, "course": "Medical use"}
]

def init_db():
    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerName TEXT,
            phone TEXT,
            location TEXT,
            address TEXT,
            medicineName TEXT,
            quantity TEXT,
            amount TEXT,
            status TEXT
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            name TEXT,
            mg TEXT,
            combination TEXT,
            use TEXT,
            tabletRate REAL,
            sheetRate REAL,
            course TEXT
        )
    """)

    # Seed the table if empty
    cursor.execute("SELECT COUNT(*) FROM medicines")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
            INSERT INTO medicines (category, name, mg, combination, use, tabletRate, sheetRate, course)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, [
            (med["category"], med["name"], med["mg"], med["combination"], med["use"], med["tabletRate"], med["sheetRate"], med["course"])
            for med in INITIAL_MEDICINES
        ])

    conn.commit()
    conn.close()

init_db()

@app.route("/")
def home():
    return "Medical Shop Backend Running"

@app.route("/orders", methods=["GET"])
def get_orders():
    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM orders")
    rows = cursor.fetchall()

    conn.close()

    orders = []
    for row in rows:
        orders.append({
            "id": row[0],
            "customerName": row[1],
            "phone": row[2],
            "location": row[3],
            "address": row[4],
            "medicineName": row[5],
            "quantity": row[6],
            "amount": row[7],
            "status": row[8]
        })

    return jsonify(orders)

@app.route("/orders", methods=["POST"])
def add_order():
    data = request.json

    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO orders
        (customerName, phone, location, address, medicineName, quantity, amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["customerName"],
        data["phone"],
        data["location"],
        data["address"],
        data["medicineName"],
        data["quantity"],
        data["amount"],
        data["status"]
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Order added successfully"})

@app.route("/orders/<int:order_id>", methods=["PUT"])
def update_order_status(order_id):
    data = request.json

    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE orders SET status = ? WHERE id = ?",
        (data["status"], order_id)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Status updated successfully"})

@app.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()

    cursor.execute("DELETE FROM orders WHERE id = ?", (order_id,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Order deleted successfully"})

@app.route("/medicines", methods=["GET"])
def get_medicines():
    category = request.args.get("category")
    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()
    
    if category:
        cursor.execute("SELECT * FROM medicines WHERE category = ?", (category,))
    else:
        cursor.execute("SELECT * FROM medicines")
        
    rows = cursor.fetchall()
    conn.close()

    medicines = []
    for row in rows:
        medicines.append({
            "id": row[0],
            "category": row[1],
            "name": row[2],
            "mg": row[3],
            "combination": row[4],
            "use": row[5],
            "tabletRate": row[6],
            "sheetRate": row[7],
            "course": row[8]
        })

    return jsonify(medicines)

@app.route("/medicines", methods=["POST"])
def add_medicine():
    data = request.json

    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO medicines
        (category, name, mg, combination, use, tabletRate, sheetRate, course)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("category"),
        data.get("name"),
        data.get("mg"),
        data.get("combination"),
        data.get("use"),
        data.get("tabletRate"),
        data.get("sheetRate"),
        data.get("course")
    ))

    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({"message": "Medicine added successfully", "id": new_id})

@app.route("/medicines/<int:med_id>", methods=["PUT"])
def update_medicine(med_id):
    data = request.json

    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE medicines
        SET category = ?, name = ?, mg = ?, combination = ?, use = ?, tabletRate = ?, sheetRate = ?, course = ?
        WHERE id = ?
    """, (
        data.get("category"),
        data.get("name"),
        data.get("mg"),
        data.get("combination"),
        data.get("use"),
        data.get("tabletRate"),
        data.get("sheetRate"),
        data.get("course"),
        med_id
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Medicine updated successfully"})

@app.route("/medicines/<int:med_id>", methods=["DELETE"])
def delete_medicine(med_id):
    conn = sqlite3.connect("medical_shop.db")
    cursor = conn.cursor()

    cursor.execute("DELETE FROM medicines WHERE id = ?", (med_id,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Medicine deleted successfully"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)