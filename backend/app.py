from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)