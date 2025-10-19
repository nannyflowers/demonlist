fetch('demons.json')
    .then(response => response.json())
    .then(demons => {
        // Sort demons by gddlRating descending
        demons.sort((a, b) => b.gddlRating - a.gddlRating);

        const container = document.getElementById('demon-list');

        demons.forEach((demon, index) => {
            const card = document.createElement('div');
            card.className = 'demon-card';

            card.innerHTML = `
                <!-- Left Demon Image -->
                <img class="demon-image" src="../assets/thenightmare.jpg" alt="${demon.name}">

                <!-- Right Content -->
                <div class="demon-content">
                    <div class="demon-title">#${index + 1} - ${demon.name}</div>

                    <div class="demon-info-bar">
                        <div>Attempts: ${demon.attempts}</div>
                        <div>GDDL Rating: ${demon.gddlRating}</div>
                        <div>Enjoyment: ${demon.enjoymentRating}</div>
                    </div>

                    <img class="demon-face" src="${demon.difficulty}" alt="demon face">
                </div>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading demons:", error));
