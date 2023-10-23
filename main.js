const repositoryOwner = 'franksun01';
const repositoryName = 'brainstorming.github.io';

fetch(`https://api.github.com/repos/${repositoryOwner}/${repositoryName}/issues`)
    .then(response => response.json())
    .then(data => {
        const ideasList = document.getElementById("ideas");
        ideasList.innerHTML = ""; // Clear existing ideas

        data.forEach(issue => {
            const ideaItem = document.createElement("li");
            ideaItem.textContent = issue.title;
            ideasList.appendChild(ideaItem);
        });
    })
    .catch(error => console.error('Error fetching issues:', error));
