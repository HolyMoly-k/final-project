import psycopg2
import os
from config import PASSWORD_DB

def connect_db():
    database_url = os.getenv('DATABASE_URL')
    return psycopg2.connect(database_url)
