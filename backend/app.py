import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    data = request.json
    ingredients = data.get("ingredients")

    api_key = "your_spoonacular_api_key"
    url = f"https://api.spoonacular.com/recipes/findByIngredients"
    params = {
        "ingredients": ",".join(ingredients),
        "apiKey": api_key,
        "number": 1  # Fetch 1 recipe
    }
    response = requests.get(url, params=params)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)
