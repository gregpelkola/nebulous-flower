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

# Create an Expense model
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    amount = db.Column(db.Float, nullable=False)

# CRUD operations

# Get all expenses
@app.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([{'id': e.id, 'title': e.title, 'amount': e.amount} for e in expenses])

# Add a new expense
@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    new_expense = Expense(title=data['title'], amount=data['amount'])
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({'id': new_expense.id, 'title': new_expense.title, 'amount': new_expense.amount})

# Delete an expense
@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    expense = Expense.query.get(id)
    if expense:
        db.session.delete(expense)
        db.session.commit()
        return jsonify({'message': 'Expense deleted'})
    return jsonify({'message': 'Expense not found'}), 404

# Run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5173)