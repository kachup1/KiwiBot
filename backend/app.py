# app.py
from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend


@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    data = request.json
    protein_goal = data.get("proteinGoal")
    ingredients = data.get("ingredients")

    prompt = f"Create a recipe with {protein_goal} grams of protein using these ingredients: {', '.join(ingredients)}."

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )

    recipe = response.choices[0].text.strip()
    return jsonify({"recipe": recipe})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
