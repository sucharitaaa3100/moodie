from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)


data = pd.read_csv('multi_class_sentiment_data.csv')
data.dropna(subset=['text', 'sentiment'], inplace=True)

X = data['text']
y = data['sentiment']

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

vectorizer = TfidfVectorizer(stop_words='english')
X_vectorized = vectorizer.fit_transform(X)

model = MultinomialNB()
model.fit(X_vectorized, y_encoded)


@app.route('/analyze', methods=['POST'])
def analyze():
    input_text = request.json.get('text', '')
    if not input_text:
        return jsonify({'error': 'No text provided'}), 400

    text_vector = vectorizer.transform([input_text])
    prediction = model.predict(text_vector)
    label = label_encoder.inverse_transform(prediction)[0]

    return jsonify({'label': label})

if __name__ == '__main__':
    app.run(debug=True)
