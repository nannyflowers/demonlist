import pandas as pd
import json
import os
import subprocess
from datetime import datetime

excel_file = r"..\demonlist.xlsx"
json_file = "demons.json"

df = pd.read_excel(excel_file)
columns_to_keep = ["Name", "id", "Enjoyment (/10)", "GDDL Rating", "Attempts", "Difficulty Face", "Date Beaten"]
df = df[columns_to_keep]
df = df.rename(columns={
    "Name": "name",
    "GDDL Rating": "gddlRating",
    "Enjoyment (/10)": "enjoymentRating",
    "Attempts": "attempts",
    "Difficulty Face": "difficultyFace",
    "Date Beaten": "dateBeaten"
})

demons = df.to_dict(orient="records")

for demon in demons:
    demon["dateBeaten"] = demon["dateBeaten"].timestamp()

print(demons)

with open(json_file, "w") as f:
    json.dump(demons, f, indent=4, ensure_ascii=False)

subprocess.run(["git", "add", json_file])
subprocess.run(["git", "commit", "-m", "update list"])
subprocess.run(["git", "push", "origin", "main"])