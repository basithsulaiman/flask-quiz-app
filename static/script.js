let quizData = [];

document.addEventListener('DOMContentLoaded', () => {
    const endpoint = (typeof BOOKMARKED_MODE !== 'undefined' && BOOKMARKED_MODE === true)
        ? '/get-bookmarked'
        : '/get-quiz';

    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        quizData = data;
        const container = document.getElementById('quiz-container');

        data.forEach((q, i) => {
            const isBookmarked = q.bookmarked;
            const div = document.createElement('div');
            div.style.marginBottom = "20px";

            div.innerHTML = `
                <p><b>${i + 1}. ${q.question}</b></p>
                <label><input type="radio" name="q${q.id}" value="A"> ${q.options.A}</label><br>
                <label><input type="radio" name="q${q.id}" value="B"> ${q.options.B}</label><br>
                <label><input type="radio" name="q${q.id}" value="C"> ${q.options.C}</label><br>
                <label><input type="radio" name="q${q.id}" value="D"> ${q.options.D}</label><br>
                <div style="text-align: left; margin-top: 8px;">
                    <label style="color: ${isBookmarked ? 'purple' : 'black'};">
                        <input type="checkbox" ${isBookmarked ? "disabled checked" : ""} 
                               data-qid="${q.id}" class="bookmark-checkbox">
                        🔖 Bookmark
                    </label>
                </div>
            `;
            container.appendChild(div);
        });

        document.querySelectorAll('.bookmark-checkbox').forEach(cb => {
            cb.addEventListener('change', () => {
                const qid = cb.dataset.qid;
                bookmarkQuestion(qid, cb);
            });
        });
    });
});



function submitQuiz() {
    // Lock the quiz
    document.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);

    let score = 0;
    let correct = 0, wrong = 0, unanswered = 0;

    let reportHTML = "<h2>📊 Quiz Report</h2>";

    quizData.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
        const userAns = selected ? selected.value : null;
        const isCorrect = userAns === q.correct;

        if (!userAns) {
            unanswered++;
        } else if (isCorrect) {
            correct++;
            score++;
        } else {
            wrong++;
        }

        let optionHTML = '';
        for (const [key, value] of Object.entries(q.options)) {
            let style = "";
            if (key === q.correct) {
                style = "background-color: #ccffcc"; // correct - green
            }
            if (userAns === key && userAns !== q.correct) {
                style = "background-color: #ffcccc"; // wrong - red
            }
            optionHTML += `<label style="${style}; display: block; padding: 4px; border-radius: 5px;">
                <input type="radio" disabled ${userAns === key ? "checked" : ""}> <b>${key}</b>: ${value}
            </label>`;
        }

        reportHTML += `
            <div style="background-color: #f5f5f5; padding: 12px; margin-bottom: 12px; border-radius: 8px;">
                <b>Q${i + 1}: ${q.question}</b><br><br>
                ${optionHTML}
                <br>✅ Correct: <b>${q.correct}</b> &nbsp;&nbsp; 🧠 Your Answer: <b>${userAns || "Not answered"}</b>
            </div>
        `;
    });

    // Score Summary
    reportHTML = `
        <h2 style="color: #333;">Your Score: ${score} / ${quizData.length}</h2>
        <p>✅ Correct: ${correct} &nbsp;&nbsp; ❌ Wrong: ${wrong} &nbsp;&nbsp; ⚠️ Unanswered: ${unanswered}</p>
        <hr>
    ` + reportHTML;

    // Replace quiz with report
    document.getElementById("quiz-container").style.display = "none";
    document.querySelector("button").style.display = "none";
    const reportDiv = document.getElementById("report-container");
    reportDiv.innerHTML = reportHTML;
    reportDiv.style.display = "block";
}

function bookmarkQuestion(qid, checkbox) {
    fetch(`/bookmark/${qid}`, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            checkbox.disabled = true;
            checkbox.parentElement.style.color = 'purple';
        })
        .catch(err => console.error("Bookmark failed:", err));
}
