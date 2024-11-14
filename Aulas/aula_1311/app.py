from flask import Flask, render_template, request

app = Flask(__name__)
n = "adm"
senha = "1234"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login", methods=["POST"])
def login():
    f_name = request.form["name"]
    f_senha = request.form["senha"]

    if f_name == "" or f_senha == "":
        return "Login invalido"

    if f_name == n and f_senha == senha:
        return "Login efetuado com sucesso \nBem Vindo, " + f_name
    else:
        return "Login invalido"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
