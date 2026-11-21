import os
from dotenv import load_dotenv

load_dotenv()

PASSWORD_DB = os.getenv('PASSWORD_DB')
PER_PAGE = 6