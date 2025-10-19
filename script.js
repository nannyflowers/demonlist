fetch('demons.json')
    .then(response => response.json())
    .then(demons => {
        const container = document.getElementById('demon-list');

        demons.forEach((demon, index) => {
            const card = document.createElement('div');
            card.className = 'demon-card';

            card.innerHTML = `
                <img src="assets/thenightmare.jpg" alt="${demon.name}">
                <div class="demon-info">
                    <h3>#${index + 1} - ${demon.name}</h3>
                    <p><strong>Creator:</strong> ${demon.creator}</p>
                    <p><strong>Difficulty:</strong> ${demon.difficulty}</p>
                    <p><strong>ID:</strong> ${demon.id}</p>
                    <p><strong>Attempts:</strong> ${demon.attempts}</p>
                    <p><strong>GDDL Rating:</strong> ${demon.gddlRating}</p>
                    <p><strong>Enjoyment:</strong> ${demon.enjoymentRating}</p>
                </div>
                <img class="demon-icon" src="${demon.icon}" alt="icon">
            `;

            container.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading demons:", error));
