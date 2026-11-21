import psycopg2, psycopg2.extras
import os
from config import PASSWORD_DB

def connect_db():
    return psycopg2.connect(
        dbname = "website_houses",
        user = "postgres",
        password = PASSWORD_DB,
        host = "localhost"
    )

def get_house_byID(house_id):
    conn = connect_db()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        cursor.execute("SELECT * FROM houses WHERE id = %s", (house_id,))
        house = cursor.fetchone()
        if not house:
            return False
        return house
    finally:
        cursor.close()
        conn.close()

def get_images_house_byID(house_id):
    conn = connect_db()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        cursor.execute("SELECT image FROM houses_images WHERE id = %s", (house_id,))
        house = cursor.fetchall()
        return house
    finally:
        cursor.close()
        conn.close()

def create_request(data): # надо добавить чтобы заявка не одобрялась в случае повторного емейла или телефона ТОЛЬКО есть заявка отправляется на тот же дом, иначе тру
    conn = connect_db()
    cursor = conn.cursor()
    try:
        name, last_name, email, phone, message, home_id = data.get("name"), data.get("last_name"), data.get("email"), data.get("phone"), data.get("message"), data.get("home_id")
        if not get_house_byID(home_id):
            return False
        if not phone:
            cursor.execute("INSERT INTO inquiries (name, last_name, email, home_id, message) VALUES (%s, %s, %s, %s, %s)", (name, last_name, email, home_id, message))
            conn.commit()
            return True
        else:
            cursor.execute("INSERT INTO inquiries (name, last_name, email, phone_number, home_id, message) VALUES (%s, %s, %s, %s, %s, %s)", (name, last_name, email, phone, home_id, message))
            conn.commit()
            return True
    except Exception as e:
        print(e)
        return False
    finally:
        cursor.close()
        conn.close()

def get_all_homes():
    conn = connect_db()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        cursor.execute("SELECT * FROM houses")
        result = cursor.fetchall()
        return result
    finally:
        cursor.close()
        conn.close()

def get_homes_for_page(page, per_page):
    page = max(page, 1)
    conn = connect_db()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        cursor.execute(f"SELECT * FROM houses ORDER BY id LIMIT {per_page} OFFSET {(page-1)*per_page}")
        result = cursor.fetchall()
        return result
    finally:
        cursor.close()
        conn.close()

def count_homes():
    conn = connect_db()
    cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT COUNT(*) FROM houses")
        result = cursor.fetchall()
        return result[0][0]
    finally:
        cursor.close()
        conn.close()