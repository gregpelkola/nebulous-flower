from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Create a Flask app
app = Flask(__name__)
CORS(app)

# Set up SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expense.db'

# Initialize the database
db = SQLAlchemy(app)

# Create a Expense model
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    amount = db.Column(db.Float, nullable=False)

# Create the table
if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)