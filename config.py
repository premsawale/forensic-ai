import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "change-this-secret-key")
    DATABASE = os.path.join("database", "database.db")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    UPLOAD_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg"}
