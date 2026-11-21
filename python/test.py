import database as db
from math import ceil

count = db.count_homes()
print(ceil(db.count_homes() / 5))