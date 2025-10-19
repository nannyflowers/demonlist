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
                <!-- Left Image -->
                <div class="demon-image-wrapper">
                    <img class="demon-image" src="${demon.image}" alt="${demon.Name}">
                </div>

                <!-- Right Content -->
                <div class="demon-content">
                    <div class="demon-title">#${index + 1} - ${demon.name}</div>

                    <!-- Bottom Info Bar using spans -->
                    <div class="demon-info-bar">
                        <span>Attempts: ${demon.Attempts}</span>
                        <span>GDDL Rating: ${demon["GDDL Rating"]}</span>
                        <span>Enjoyment: ${demon["Enjoyment (/10)"]}</span>
                        <span>ID: ${demon.id}</span>
                    </div>

                    <!-- Face Icon -->
                    <img class="demon-face" src="${demon.difficulty}" alt="demon face">
                </div>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading demons:", error));