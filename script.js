fetch('demons.json')
    .then(response => response.json())
    .then(demons => {
        // Sort demons by gddlRating descending
        demons.sort((a,b) => b.gddlRating - a.gddlRating);

        const container = document.getElementById('demon-list');

        demons.forEach((demon, index) => {
            const card = document.createElement('div');
            card.className = 'demon-card';

            card.innerHTML = `
                <!-- Left Image -->
                <div class="demon-image-wrapper">
                    <img class="demon-image" src="${demon.image}" alt="${demon.name}">
                </div>

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
    .catch(err => console.error("Error loading demons:", err));
