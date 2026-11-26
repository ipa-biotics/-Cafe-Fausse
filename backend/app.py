from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return {"message": "Cafe Fausse API is running"}