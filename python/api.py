import psycopg2.extras
from flask import Flask, jsonify, request
from database import connect_db

app = Flask(__name__, static_folder='..', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/houses', methods=['GET', 'POST'])
def get_houses():
    conn = connect_db()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        if request.method == 'POST':
            data = request.get_json()
            location, type_home, price_range = data.get('location'), data.get('type'), data.get('price')
            if '-' in price_range:
                price_min, price_max = price_range.split('-')
                cursor.execute("SELECT * FROM houses WHERE location = %s AND type = %s AND price BETWEEN %s AND %s", (location, type_home, int(price_min), int(price_max)))
            else:
                cursor.execute("SELECT * FROM houses WHERE location = %s AND type = %s AND price >= %s", (location, type_home, int(price_range[:-1])))
        else: 
            cursor.execute("SELECT * FROM houses")
        houses = cursor.fetchall()
        return jsonify(houses)
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run()
