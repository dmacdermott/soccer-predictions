import json


def getWeeksMatches(wkNumber):
    weeksMatches = list()

    with open("data/all_matches.json") as matches:
        matches = json.load(matches)
        for num, match in enumerate(matches["data"], start=1):
            data = dict()
            homeData = dict()
            awayData = dict()
            if match["game_week"] == wkNumber:
                data["home_name"] = match["home_name"]
                data["away_name"] = match["away_name"]
                data["odds_ft_x"] = match["odds_ft_x"]
                data["odds_ft_1"] = match["odds_ft_1"]
                data["odds_ft_2"] = match["odds_ft_2"]
                data["homeGoalCount"] = match["homeGoalCount"]
                data["awayGoalCount"] = match["awayGoalCount"]
                homeData = getTeamData(match["home_name"], wkNumber, "home_")
                awayData = getTeamData(match["away_name"], wkNumber, "away_")
                matchData = {**data, **homeData, **awayData}
                weeksMatches.append(matchData)
    print(weeksMatches)
    return weeksMatches


def getTeamData(club, wkNumber, HorA):
    weeklyTeamData = dict()
    with open(f"data/stats/wk{wkNumber}.json") as teamStats:
        teamStats = json.load(teamStats)
        for team in teamStats["data"]:
            if team["cleanName"] == club:
                weeklyTeamData[f"{HorA}performance_rank"] = team["performance_rank"]
                weeklyTeamData[f"{HorA}risk"] = team["risk"]
                weeklyTeamData[f"{HorA}shotsAVG_overall"] = team["stats"]["shotsAVG_overall"]
                weeklyTeamData[f"{HorA}shotsAVG_home"] = team["stats"]["shotsAVG_home"]
                weeklyTeamData[f"{HorA}shotsAVG_away"] = team["stats"]["shotsAVG_away"]
                weeklyTeamData[f"{HorA}shotsOnTargetAVG_overall"] = team["stats"]["shotsOnTargetAVG_overall"]
                weeklyTeamData[f"{HorA}shotsOnTargetAVG_home"] = team["stats"]["shotsOnTargetAVG_home"]
                weeklyTeamData[f"{HorA}shotsOnTargetAVG_away"] = team["stats"]["shotsOnTargetAVG_away"]
                weeklyTeamData[f"{HorA}possessionAVG_overall"] = team["stats"]["possessionAVG_overall"]
                weeklyTeamData[f"{HorA}possessionAVG_home"] = team["stats"]["possessionAVG_home"]
                weeklyTeamData[f"{HorA}possessionAVG_away"] = team["stats"]["possessionAVG_away"]
                weeklyTeamData[f"{HorA}xg_for_avg_overall"] = team["stats"]["xg_for_avg_overall"]
                weeklyTeamData[f"{HorA}xg_for_avg_home"] = team["stats"]["xg_for_avg_home"]
                weeklyTeamData[f"{HorA}xg_for_avg_away"] = team["stats"]["xg_for_avg_away"]
                weeklyTeamData[f"{HorA}xg_against_avg_overall"] = team["stats"]["xg_against_avg_overall"]
                weeklyTeamData[f"{HorA}xg_against_avg_home"] = team["stats"]["xg_against_avg_home"]
                weeklyTeamData[f"{HorA}xg_against_avg_away"] = team["stats"]["xg_against_avg_away"]
                weeklyTeamData[f"{HorA}formRun_overall"] = team["stats"]["additional_info"]["formRun_overall"]
    return weeklyTeamData


for week in range(3):
    getWeeksMatches(week+2)

# getWeeksMatches(3)
