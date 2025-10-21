import os
import requests
from bs4 import BeautifulSoup

def download_image(id):
    #is it already downloaded
    if os.path.exists(f"assets/{id}.webp"):
        return False
    
    url = f"https://levelthumbs.prevter.me/thumbnail/{id}"
    response = requests.get(url)

    #does one exist
    if str(response.status_code) == "404":
        return False
    
    save_folder = "assets"
    os.makedirs(save_folder, exist_ok=True)

    img_data = requests.get(url).content
    img_name = os.path.basename(url.split("?")[0]) + ".webp"
    save_path = os.path.join(save_folder, img_name)

    with open(save_path, "wb") as f:
        f.write(img_data)
        return True