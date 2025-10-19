// Load demons from demons.json
fetch('demons.json')
    .then(response => response.json())
    .then(demons => {
        const container = document.getElementById('demon-list');

        demons.forEach(demon => {
            const card = document.createElement('div');
            card.className = 'demon-card';
            card.innerHTML = `
                <h3>${demon.name}</h3>
                <p><strong>Difficulty:</strong> ${demon.difficulty}</p>
                <p><strong>ID:</strong> ${demon.id}</p>
                <p><strong>Attempts:</strong> ${demon.attempts}</p>
                <p><strong>GDDL Rating:</strong> ${demon.gddlRating}</p>
                <p><strong>Enjoyment:</strong> ${demon.enjoymentRating}</p>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading demons:", error));
