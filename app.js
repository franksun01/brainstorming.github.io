const firebaseConfig = {
    apiKey: "AIzaSyCKzloE6R4bK9REbmGm-bHAfqF2WaA7fjA",
    authDomain: "brainstorming-idea.firebaseapp.com",
    databaseURL: "https://brainstorming-idea-default-rtdb.firebaseio.com",
    projectId: "brainstorming-idea",
    storageBucket: "brainstorming-idea.appspot.com",
    messagingSenderId: "543716867271",
    appId: "1:543716867271:web:022e3f6c562f992b6bd2e2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let timerDuration = 300; // 5 minutes in seconds
let timerInterval;

function startTimer() {
    if(timerInterval) return; // Ensure we don't start the timer multiple times

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
    const idea = document.getElementById('idea').value;
    if (idea.trim() === '') {
        alert('Please enter a valid idea!');
        return;
    }
    
    // Push the idea to Firebase
    database.ref('ideas/').push({
        content: idea
    });

    // Clear the idea textarea
    document.getElementById('idea').value = '';
}

function addIdeaToDisplay(content) {
    const ideasContainer = document.getElementById('ideas-container');
    const ideaElement = document.createElement('div');
    ideaElement.textContent = content;
    ideasContainer.appendChild(ideaElement);
}

database.ref('ideas/').on('child_added', function(data) {
    addIdeaToDisplay(data.val().content);
}, function(error) {
    console.error("Error retrieving ideas: ", error);
});

document.getElementById('submit-button').addEventListener('click', submitIdea);

// Start the timer immediately
startTimer();