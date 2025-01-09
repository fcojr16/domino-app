const maxPoints = 200;

function addCustomPoint(player) {
    const pointsElement = document.getElementById(`${player}Points`);
    const scoresList = document.getElementById(`${player}Scores`);
    const inputElement = document.getElementById(`${player}Input`);
    const victoriesElement = document.getElementById(`${player}Victories`);

    let points = parseInt(pointsElement.textContent);
    let victories = parseInt(victoriesElement.textContent.split(': ')[1]);
    const newPoints = parseInt(inputElement.value);

    if (isNaN(newPoints) || newPoints <= 0) {
        alert("Por favor, ingresa un número válido de puntos.");
        return;
    }

    points += newPoints;

    const listItem = document.createElement("li");
    listItem.innerHTML = `${newPoints} <button onclick="removeScore('${player}', ${newPoints}, this)">Eliminar</button>`;
    scoresList.appendChild(listItem);

    if (points >= maxPoints) {
        alert(`${document.getElementById(`${player}NameDisplay`).textContent} ha ganado!`);
        points = 0;
        victories++;
        victoriesElement.textContent = `Victorias: ${victories}`;
        scoresList.innerHTML = "";
    }

    pointsElement.textContent = points;
    inputElement.value = "";
}

function removeScore(player, score, button) {
    const pointsElement = document.getElementById(`${player}Points`);
    let points = parseInt(pointsElement.textContent);
    points -= score;
    pointsElement.textContent = points >= 0 ? points : 0;

    const listItem = button.parentNode;
    listItem.remove();
}

function editName(player) {
    const nameDisplay = document.getElementById(`${player}NameDisplay`);
    const nameInput = document.getElementById(`${player}Name`);

    nameDisplay.style.display = "none";
    nameInput.style.display = "block";
    nameInput.value = nameDisplay.textContent;

    nameInput.addEventListener("blur", () => {
        nameDisplay.textContent = nameInput.value || (player === "home" ? "Casa" : "Visita");
        nameDisplay.style.display = "inline";
        nameInput.style.display = "none";
    });
}

function resetGame() {
    if (confirm("¿Estás seguro de que quieres reiniciar todo? Esto eliminará los puntos y victorias.")) {
        document.getElementById('homePoints').textContent = 0;
        document.getElementById('homeVictories').textContent = "Victorias: 0";
        document.getElementById('awayPoints').textContent = 0;
        document.getElementById('awayVictories').textContent = "Victorias: 0";
        document.getElementById('homeScores').innerHTML = "";
        document.getElementById('awayScores').innerHTML = "";
        document.getElementById('homeNameDisplay').textContent = "Casa";
        document.getElementById('awayNameDisplay').textContent = "Visita";
    }
}
