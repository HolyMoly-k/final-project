import psycopg2
from config import PASSWORD_DB

def connect_db():
    return psycopg2.connect(
        dbname = "website_houses",
        user = "postgres",
        password = PASSWORD_DB,
        host = "localhost"
    )
