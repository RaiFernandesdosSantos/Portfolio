from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("exercise_four.html")


@app.route("/first")
def first():
    return render_template("exercise_one.html")


@app.route("/second")
def second():
    return render_template("exercise_two.html")


@app.route("/third")
def third():
    return render_template("exercise_three.html")


@app.route("/fifth")
def fifth():
    return render_template("exercise_five.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
