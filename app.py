from flask import Flask, render_template, jsonify, request
import mysql.connector
import random

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="mysql123",
        database="quizdb"
    )


@app.route('/get-quiz')
def get_quiz():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM questions")
    all_questions = cursor.fetchall()

    cursor.execute("SELECT question_id FROM bookmark")
    bookmarked = {row['question_id'] for row in cursor.fetchall()}
    conn.close()

    selected = random.sample(all_questions, 20) if len(all_questions) >= 20 else all_questions

    questions = []
    for q in selected:
        questions.append({
            'id': q['id'],
            'question': q['question'],
            'options': {
                'A': q['option_a'],
                'B': q['option_b'],
                'C': q['option_c'],
                'D': q['option_d']
            },
            'correct': q['correct_option'],
            'bookmarked': q['id'] in bookmarked
        })

    return jsonify(questions)



# ✅ Move this ABOVE app.run
@app.route('/bookmark/<int:qid>', methods=['POST'])
def bookmark_question(qid):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM bookmark WHERE question_id = %s", (qid,))
    if not cursor.fetchone():
        cursor.execute("INSERT INTO bookmark (question_id) VALUES (%s)", (qid,))
        conn.commit()
    conn.close()
    return jsonify({"status": "success", "bookmarked_id": qid})



@app.route('/get-bookmarked')
def get_bookmarked():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Join questions + bookmark
    cursor.execute("""
        SELECT q.* FROM questions q
        JOIN bookmark b ON q.id = b.question_id
    """)
    bookmarked_questions = cursor.fetchall()
    conn.close()

    questions = []
    for q in bookmarked_questions:
        questions.append({
            'id': q['id'],
            'question': q['question'],
            'options': {
                'A': q['option_a'],
                'B': q['option_b'],
                'C': q['option_c'],
                'D': q['option_d']
            },
            'correct': q['correct_option'],
            'bookmarked': True  # force bookmark status
        })

    return jsonify(questions)

@app.route('/bookmarked')
def bookmarked_page():
    return render_template('index.html', bookmarked_mode=True)

@app.route('/')
def index():
    return render_template('index.html', bookmarked_mode=False)




# ✅ app runs after all routes are declared
if __name__ == '__main__':
    app.run(debug=True)
