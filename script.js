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

                card.addEventListener("click", () => {
                    navigator.clipboard.writeText(demon.id)
                        .then(() => {
                            const audio = new Audio("assets/copy_id.ogg");
                            audio.play();
                            alert("Copied id to clipboard!")
                        })
                        .catch(err => {
                            alert("Failed to copy id due to" + err)
                        });
                });


                card.addEventListener("mouseenter", () => {
                    const audio = new Audio("assets/hover_click.ogg")
                    audio.volume = 0.02;
                    audio.play();
                });

                const timestamp = new Date(demon.dateBeaten * 1000)
                const formatted_ts = new Intl.DateTimeFormat("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit"
                }).format(timestamp);

                card.innerHTML = `
                    <div class="demon-image-wrapper">
                        <img class="demon-image" src="https://levelthumbs.prevter.me/thumbnail/${demon.id}" alt="${demon.name}">
                    </div>
                    <div class="demon-content">
                        <div class="demon-title">#${index + 1} - ${demon.name}</div>
                        <div class="demon-info-bar">
                            <span>Attempts: ${demon.attempts}</span>
                            <span>GDDL Rating: ${demon.gddlRating}</span>
                            <span>Enjoyment: ${demon.enjoymentRating}</span>
                            <span>ID: ${demon.id}</span>
                            <span>Date Beaten: ${formatted_ts}</span>
                        </div>
                        <img class="demon-face" src="${demon.difficultyFace}" alt="demon face">
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function sort(sortBy, ascending = false) {
            demons.sort((a, b) => {
                let result;

                if (typeof a[sortBy] === 'string') {
                    result = a[sortBy].localeCompare(b[sortBy]);
                } else {
                    result = a[sortBy] - b[sortBy];
                }

                return ascending ? result : -result;
            });
        };

        function is_ascending() {
            const sortButton = document.getElementById("sortOrder");
            if (sortButton.textContent == "↑") {
                return true;
            } else {
                return false;
            };
        }

        function render_with_sort(sort_val, asc = false) {
            sort(sort_val, asc);
            renderDemons();
        };


        render_with_sort("gddlRating")

        // --- now safe to use demons here ---
        const sortSelect = document.getElementById('sort');
        sortSelect.addEventListener('change', () => {
            const sortBy = sortSelect.value;
            render_with_sort(sortBy, is_ascending())
        });

        const sortButton = document.getElementById("sortOrder");
        sortButton.addEventListener("click", () => {
            if (is_ascending()) {
                sortButton.textContent = "↓"
                const sortBy = sortSelect.value;
                render_with_sort(sortBy, false)
            } else {
                sortButton.textContent = "↑"
                const sortBy = sortSelect.value;
                render_with_sort(sortBy, true)
            };
        });
    })
    .catch(error => console.error("Error loading demons:", error));