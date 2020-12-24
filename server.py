from flask import Flask
from flask import jsonify
import app as func
import requests
import json

app = Flask(__name__)


@app.route("/matches/<week>")
def getMatches(week):
    matches = func.getWeeksMatches(int(week))
    return jsonify(matches)


@app.route("/leaguestats")
def getSeasonData():
    with open("data/season_data.json") as leagueStats:
        leagueStats = json.load(leagueStats)
        return jsonify(leagueStats)
