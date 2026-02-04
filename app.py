from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime
import os

app = Flask(__name__)

# Get the directory where this app.py file lives
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "responses.json")

# Ensure responses.json exists
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/save", methods=["POST"])  # Changed the URL name
def save_reply():                          # Changed function name
    try:
        data = request.get_json()
        if not data or "answer" not in data:
            return jsonify({"error": "Answer required"}), 400

        answer = data["answer"]
        print(f"💌 Received answer: {answer}") 

        # ... (keep the rest of the saving logic the same) ...

        # Read existing data
        try:
            with open(DATA_FILE, "r") as f:
                content = f.read()
                responses = json.loads(content) if content else []
        except (json.JSONDecodeError, FileNotFoundError):
            responses = []

        # Add new response
        responses.append({
            "answer": answer,
            "timestamp": datetime.now().isoformat()
        })

        # Save back to file
        with open(DATA_FILE, "w") as f:
            json.dump(responses, f, indent=2)

        return jsonify({"success": True})

    except Exception as e:
        print(f"❌ Error saving data: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print(f"🚀 Starting app in: {BASE_DIR}")
    print("🌍 Open this URL in your browser: http://127.0.0.1:5000")
    app.run(debug=True, port=5000)