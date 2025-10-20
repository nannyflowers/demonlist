fetch('demons.json?t=' + new Date().getTime())
    .then(response => response.json())
    .then(demons => {
        console.log(demons);

        // --- render function ---
        const container = document.getElementById('demon-list');

        function renderDemons() {
            container.innerHTML = '';
            demons.forEach((demon, index) => {
                const card = document.createElement('div');
                card.className = 'demon-card';
                $.ajax({
                    type: "POST",
                    url: "downloadimage.py",
                    data: { id: demon.id }
                }).done(function(o) {
                    // do something
                });

                card.innerHTML = `
                    <div class="demon-image-wrapper">
                        <img class="demon-image" src="assets/${demon.id}.webp" alt="${demon.name}">
                    </div>
                    <div class="demon-content">
                        <div class="demon-title">#${index + 1} - ${demon.name}</div>
                        <div class="demon-info-bar">
                            <span>Attempts: ${demon.attempts}</span>
                            <span>GDDL Rating: ${demon.gddlRating}</span>
                            <span>Enjoyment: ${demon.enjoymentRating}</span>
                            <span>ID: ${demon.id}</span>
                        </div>
                        <img class="demon-face" src="${demon.difficultyFace}" alt="demon face">
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function sort(sortBy) {
            demons.sort((a, b) => {
                if (typeof a[sortBy] === 'string') {
                    return a[sortBy].localeCompare(b[sortBy]);
                } else {
                    return b[sortBy] - a[sortBy];
                }
            });
        }

        sort("gddlRating")
        renderDemons(); // initial render

        // --- now safe to use demons here ---
        const sortSelect = document.getElementById('sort');
        sortSelect.addEventListener('change', () => {
            const sortBy = sortSelect.value;
            sort(sortBy)
            renderDemons();
        });
    })
    .catch(error => console.error("Error loading demons:", error));