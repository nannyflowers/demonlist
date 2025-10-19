fetch('demons.json?t=' + new Date().getTime())
    .then(response => response.json())
    .then(demons => {
        console.log(demons);
        // Sort demons by gddlRating descending
        demons.sort((a, b) => b.gddlRating - a.gddlRating);

        const container = document.getElementById('demon-list');

        demons.forEach((demon, index) => {
            const card = document.createElement('div');
            card.className = 'demon-card';

            card.innerHTML = `
                <!-- Left Image -->
                <div class="demon-image-wrapper">
                    <img class="demon-image" src="assets\\thenightmare.jpg" alt="${demon.name}">
                </div>

                <!-- Right Content -->
                <div class="demon-content">
                    <div class="demon-title">#${index + 1} - ${demon.name}</div>

                    <!-- Bottom Info Bar using spans -->
                    <div class="demon-info-bar">
                        <span>Attempts: ${demon.attempts}</span>
                        <span>GDDL Rating: ${demon.gddlRating}</span>
                        <span>Enjoyment: ${demon.enjoymentRating}</span>
                        <span>ID: ${demon.id}</span>
                    </div>

                    <!-- Face Icon -->
                    <img class="demon-face" src="${demon.difficultyFace}" alt="demon face">
                </div>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading demons:", error));