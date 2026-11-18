from flask import Flask, render_template

app = Flask(__name__)

# Route 1: Intro / Splash Screen (Option 13)
@app.route("/")
def intro():
    return render_template("index.html")

# Route 2: Welcome / Get Started Screen
@app.route("/welcome")
def welcome():
    return render_template("welcome.html")

# Route 3: Placeholder for the main app after clicking "Get Started"
@app.route("/dashboard")
def dashboard():
    return '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Brainy: AI IELTS Prep — Dashboard</title>
        <style>
            body {
                margin: 0;
                height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                background: #F4F5F0;
                color: #141E30;
                text-align: center;
                padding: 20px;
            }
            h1 { font-size: 2rem; margin-bottom: 0.5rem; }
            p { color: #4A5568; margin-bottom: 1.5rem; }
            a {
                background: #1B8A99;
                color: white;
                text-decoration: none;
                padding: 12px 28px;
                border-radius: 999px;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Brainy: AI IELTS Prep</h1>
        <p>Your dashboard is ready to be built next.</p>
        <a href="/">Replay Intro</a>
    </body>
    </html>
    '''

if __name__ == "__main__":
    app.run(debug=True, port=5000)
