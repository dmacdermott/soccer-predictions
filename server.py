from flask import Flask
from flask import jsonify
import app as func

app = Flask(__name__)


@app.route("/matches/<week>")
def getMatches(week):
    matches = func.getWeeksMatches(int(week))
    return jsonify(matches)
