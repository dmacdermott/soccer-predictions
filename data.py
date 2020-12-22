# get game data for current week
import requests
import json


def getNewData():
    allMatches = requests.get(
        "https://api.footystats.org/league-matches?key=test85g57&league_id=4759").json()
    with open("data/all_matches.json", "w", encoding='utf-8') as outfile:
        json.dump(allMatches, outfile,  ensure_ascii=False, indent=4)


def getWeeksMatches():
    with open("data/all_matches.json") as matches:
        matches = json.load(matches)
        for match in matches["data"]:
            if match["game_week"] == 14:
                print(match["home_name"] + " vs " + match["away_name"])


getWeeksMatches()
