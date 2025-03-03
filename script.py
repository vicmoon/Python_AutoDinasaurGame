import pyautogui
from PIL import Image 
from flask import Flask, render_template 

app = Flask(__name__)


# im = Image.open("dinosaur.jpg")
# im.show()
@app.route('/')
def home():
    return render_template("game.html")



if __name__ == "__main__":
    app.run(debug=True)

