const firebaseConfig = {
    apiKey: "AIzaSyCKzloE6R4bK9REbmGm-bHAfqF2WaA7fjA",
    authDomain: "brainstorming-idea.firebaseapp.com",
    databaseURL: "https://brainstorming-idea-default-rtdb.firebaseio.com",
    projectId: "brainstorming-idea",
    storageBucket: "brainstorming-idea.appspot.com",
    messagingSenderId: "543716867271",
    appId: "1:543716867271:web:022e3f6c562f992b6bd2e2"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let timerDuration = 300;
let timerInterval;
let currentSessionID = null;

function startTimer() {
    if(timerInterval) return;

    timerInterval = setInterval(function() {
        timerDuration--;
        const minutes = Math.floor(timerDuration / 60);
        const seconds = timerDuration % 60;
        document.getElementById('timer').textContent = `Time Remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timerDuration <= 0) {
            clearInterval(timerInterval);
            document.getElementById('submit-button').disabled = true;
            document.getElementById('idea').disabled = true;
            document.getElementById('timer').textContent = "Time's up!";
        }
    }, 1000);
}

function submitIdea() {
    if (!currentSessionID) {
        alert('Please join a session before submitting ideas!');
        return;
    }

    const idea = document.getElementById('idea').value;
    if (idea.trim() === '') {
        alert('Please enter a valid idea!');
        return;
    }

    database.ref('sessions/' + currentSessionID + '/ideas/').push({
        content: idea
    });

    document.getElementById('idea').value = '';
}

function addIdeaToDisplay(content) {
    const ideasContainer = document.getElementById('ideas-container');
    ideaElement = document.createElement('div');
    ideaElement.textContent = content;
    ideasContainer.appendChild(ideaElement);
}

function joinSession() {
    const sessionID = document.getElementById('session-input').value.trim();
    if (!sessionID) {
        alert('Please enter a valid session ID!');
        return;
    }

    // Clear any existing displayed ideas.
    document.getElementById('ideas-container').innerHTML = '';

    currentSessionID = sessionID;
    document.getElementById('current-session-display').textContent = "Current Session: " + currentSessionID;

    // Attach listener to the specific session.
    database.ref('sessions/' + currentSessionID + '/ideas/').on('child_added', function(data) {
        addIdeaToDisplay(data.val().content);
    }, function(error) {
        console.error("Error retrieving ideas: ", error);
    });
}

document.getElementById('submit-button').addEventListener('click', submitIdea);
document.getElementById('join-session-button').addEventListener('click', joinSession);
document.getElementById('refresh-button').addEventListener('click', function() {
    location.reload();
});

startTimer();
