# get game data for current week
import requests
import json

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


def getAwayTeamStats(club):
    with open("data/team_data.json") as teamStats:
        teamStats = json.load(teamStats)
        for team in teamStats["data"]:
            if team["cleanName"] == club:
                print("CA = ", team["stats"]["cornersAVG_away"])
                print("AS = ", team["stats"]["shotsAVG_away"])
                print("AST =  ", team["stats"]["shotsOnTargetAVG_away"])
