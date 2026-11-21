import psycopg2.extras
import os
from flask import Flask, jsonify, request, abort, render_template, send_from_directory
import database as db
from config import PER_PAGE
from math import ceil

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

app = Flask(__name__, static_folder='../static', static_url_path='/static')

@app.route('/')
def index():
    return send_from_directory('..', 'index.html')

@app.route('/api/houses', methods=['GET', 'POST'])
def get_houses():
    conn = db.connect_db()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        if request.method == 'POST':
            data = request.get_json()
            location, type_home, price_range = data.get('location'), data.get('type'), data.get('price')
            if not price_range:
                return
            if '-' in price_range:
                price_min, price_max = price_range.split('-')
                cursor.execute("SELECT * FROM houses WHERE location = %s AND type = %s AND price BETWEEN %s AND %s", (location, type_home, int(price_min), int(price_max)))
            else:
                cursor.execute("SELECT * FROM houses WHERE location = %s AND type = %s AND price >= %s", (location, type_home, int(price_range[:-1])))
        else: 
            cursor.execute("SELECT * FROM houses LIMIT 3")
        houses = cursor.fetchall()
        return jsonify(houses)
    finally:
        cursor.close()
        conn.close()

@app.route('/catalog/house/<int:house_id>')
def load_house_page(house_id):
    house = db.get_house_byID(house_id)
    houses_images = db.get_images_house_byID(house_id)
    if not house:
        abort(404)
    return render_template("house.html", house=house, houses_images=houses_images)

@app.route('/api/request', methods=['POST'])
def add_request():
    data = request.get_json()
    result = db.create_request(data)
    return jsonify({"success": result})

@app.route('/catalog')
def open_catalog():
    page = request.args.get('page', default=1, type=int)
    total_pages = ceil(db.count_homes() / PER_PAGE)
    page = min(page, total_pages)
    houses = db.get_homes_for_page(page, PER_PAGE)
    return render_template("catalog.html", houses=houses, page=page, total_pages=total_pages)

if __name__ == '__main__':
    app.run()
