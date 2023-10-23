let timeRemaining = 300;  // 5 minutes in seconds
const timerDisplay = document.getElementById('timer');
const ideaTextarea = document.getElementById('idea');
const submitButton = document.querySelector('button');

function startTimer() {
    const interval = setInterval(() => {
        timeRemaining--;

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(interval);
            ideaTextarea.disabled = true;
            submitButton.disabled = true;
            timerDisplay.textContent = "Time's up!";
        }
    }, 1000);
}

function submitIdea() {
    const idea = ideaTextarea.value;
    if (idea.trim() === '') {
        alert('Please enter a valid idea!');
        return;
    }

    // Add the idea to the ideas container
    const ideasContainer = document.getElementById('ideas-container');
    const ideaElement = document.createElement('div');
    ideaElement.textContent = idea;
    ideaElement.className = 'idea';  // for potential styling later
    ideasContainer.appendChild(ideaElement);

    // Clear the idea textarea
    ideaTextarea.value = '';
}

startTimer();  // Start the timer as soon as the page loads
