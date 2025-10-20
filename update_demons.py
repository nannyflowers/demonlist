import pandas as pd
import json
import os
import subprocess
from download_image import download_image

excel_file = r"C:\Users\hayde\Documents\demonlist\demonlist\GD Demon List.xlsx"
json_file = r"C:\Users\hayde\Documents\demonlist\demonlist\demons.json"

df = pd.read_excel(excel_file)
columns_to_keep = ["Name", "id", "Enjoyment (/10)", "GDDL Rating", "Attempts", "Difficulty Face"]
df = df[columns_to_keep]
df = df.rename(columns={
    "Name": "name",
    "GDDL Rating": "gddlRating",
    "Enjoyment (/10)": "enjoymentRating",
    "Attempts": "attempts",
    "Difficulty Face": "difficultyFace"
})

demons = df.to_dict(orient="records")

for demon in demons:
    download_image(demon["id"])

with open(json_file, "w") as f:
    json.dump(demons, f, indent=4, ensure_ascii=False)

subprocess.run(["git", "add", json_file])
subprocess.run(["git", "commit", "-m", "update list"])
subprocess.run(["git", "push", "origin", "main"])