# get game data for current week
import requests
import json
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F

# DATA NEEDED
# home_name, away_name, game_week, corners_fh_home,
# corners_fh_away, shotsAVG_home, shotsAVG_away,
# shotsOnTargetAVG_home, shotsOnTargetAVG_away
# "B365H", "B365D", "B365A"


def getNewData():
    allMatches = requests.get(
        "https://api.footystats.org/league-matches?key=test85g57&league_id=4759").json()
    with open("data/all_matches.json", "w", encoding='utf-8') as outfile:
        json.dump(allMatches, outfile,  ensure_ascii=False, indent=4)


# Link with date for TeamData to check past results
# "https: // api.footystats.org/league-teams?key=example & season_id=4759 & include=stats & max_time=1600732800"
def getTeamData():
    teamData = requests.get(
        "https://api.footystats.org/league-teams?key=example&season_id=4759&include=stats").json()
    with open("data/team_data.json", "w", encoding='utf-8') as outfile:
        json.dump(teamData, outfile,  ensure_ascii=False, indent=4)


def getWeeksMatches(wkNumber):
    with open("data/all_matches.json") as matches:
        matches = json.load(matches)
        for match in matches["data"]:
            if match["game_week"] == wkNumber:
                print(match["home_name"] + " vs " + match["away_name"])


def getHomeTeamStats(club):
    with open("data/team_data.json") as teamStats:
        teamStats = json.load(teamStats)
        for team in teamStats["data"]:
            if team["cleanName"] == club:
                print("CH = ", team["stats"]["cornersAVG_home"])
                print("HS = ", team["stats"]["shotsAVG_home"])
                print("HST = ", team["stats"]["shotsOnTargetAVG_home"])
                return [team["stats"]["shotsAVG_home"], team["stats"]["shotsOnTargetAVG_home"], team["stats"]["cornersAVG_home"]]


def getAwayTeamStats(club):
    with open("data/team_data.json") as teamStats:
        teamStats = json.load(teamStats)
        for team in teamStats["data"]:
            if team["cleanName"] == club:
                print("CA = ", team["stats"]["cornersAVG_away"])
                print("AS = ", team["stats"]["shotsAVG_away"])
                print("AST =  ", team["stats"]["shotsOnTargetAVG_away"])
                return [team["stats"]["shotsAVG_away"], team["stats"]["shotsOnTargetAVG_away"], team["stats"]["cornersAVG_away"]]


def getResultsPrediction(home, away):
    homeStats = getHomeTeamStats(home)
    awayStats = getAwayTeamStats(away)
    inputs = [homeStats[0], awayStats[0], homeStats[1],
              awayStats[1], homeStats[2], awayStats[2], 5.25, 4.33, 1.57]
    model = nn.Linear(9, 1)
    model.load_state_dict(torch.load("ml_models/results_model_47.05"))
    model.eval()
    inputs = np.array(inputs, dtype="float32")
    inputs = torch.from_numpy(inputs)
    prediction = model(inputs)
    prediction = torch.round(prediction)
    if prediction[0] == 1:
        print(home + " will win")
    elif prediction[0] == 0:
        print("It will be a draw")
    else:
        print(away + " will win")


getResultsPrediction("Arsenal", "Manchester City")
