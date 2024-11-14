from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def start():
    return render_template("atividade4.html")


@app.route("/atividade1")
def atividade_um():
    return render_template("atividade1.html")


@app.route("/atividade2")
def atividade_dois():
    return render_template("atividade2.html")


@app.route("/atividade3")
def atividade_tres():
    return render_template("atividade3.html")


app.run(debug=True, host="0.0.0.0", port=8080)
