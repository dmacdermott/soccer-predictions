from flask import Flask
import app as func

app = Flask(__name__)


@app.route("/")
def helloworld():
    return func.getWeeksMatches(14)
