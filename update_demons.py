import pandas as pd
import json
import os

excel_file = "GD Demon List.xlsx"
json_file = "demons.json"

df = pd.read_excel(excel_file)
columns_to_keep = ["Name", "id", "Enjoyment (/10)", "GDDL Rating", "Attempts"]
df = df[columns_to_keep]
df = df.rename(columns={
    "Name": "name",
    "GDDL Rating": "gddlRating",
    "Enjoyment (/10)": "enjoymentRating",
    "Attempts": "attempts"
})

demons = df.to_dict(orient="records")

with open(json_file, "w") as f:
    print(demons)
    json.dump(demons, f, indent=4, ensure_ascii=False)