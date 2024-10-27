from flask import Flask, request, jsonify
import openai
import os


from flask_cors import CORS


app = Flask(__name__)

# Configure OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")  # Load your OpenAI API key from an environment variable

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    data = request.json
    protein_goal = data.get("protein_goal",'')
    ingredients = data.get("ingredients",[])
    
    prompt = f"Create a recipe with {protein_goal} grams of protein using these ingredients: {ingredients}"

    # Call OpenAI API
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )

    recipe = response.choices[0].text.strip()
    return jsonify({"recipe": recipe})

if __name__ == '__main__':
    app.run(debug=True)
