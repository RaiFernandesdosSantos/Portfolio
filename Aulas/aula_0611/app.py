from flask import Flask, render_template, request

app = Flask(__name__)
n = "adm"
senha = "1234"

tentativas = 0


@app.route("/", methods=["GET", "POST"])
def main():
    global tentativas
    msg = ""
    f_name = ""
    f_senha = ""

    if request.method == "POST":
        f_name = request.form["name"]
        f_senha = request.form["senha"]

        if f_name == n and f_senha == senha:
            msg = "Login efetuado com sucesso \nBem Vindo, " + f_name
        else:
            msg = "Login invalido \nTentativa n° " + str(tentativas)
            tentativas += 1

            if tentativas == 2:
                msg = "Voce ultrapassou o limite de tentativas"
                tentativas = 0

    return render_template("teste.html", nome=msg, mensagem=msg)


app.run(debug=True, host="0.0.0.0", port=8080)
