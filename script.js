let demons = []
let state = {
    sort_by: "gddlRating",
    ascending: false,
    date: new Date(),
};

function seconds_to_date(seconds) {
    return new Date(seconds * 1000)
};

function filter_by_date(list, cutoff) {
    return list.filter(demon => seconds_to_date(demon.dateBeaten) <= cutoff)
};

function sort_demons(list, sort_by, asc) {
    return [...list].sort((a, b) => {
        let result;

        if (typeof a[sort_by] == "string") {
            result = a[sort_by].localeCompare(b[sort_by])
        } else {
            result = a[sort_by] - b[sort_by]
        }

        return asc ? result : -result
    });
};

function create_demon_card(demon, index) {
    const card = document.createElement("div")
    card.className = "demon-card"

    card.addEventListener("click", () => {
        navigator.clipboard.writeText(demon.id)
            .then(() => {
                new Audio("assets/copy_id.ogg").play();
                alert("Copied id to clipboard!");
            })
    })

    const formatted_date = new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    }).format(seconds_to_date(demon.dateBeaten));

    card.innerHTML = `
        <div class="demon-image-wrapper">
            <img class="demon-image" src="https://levelthumbs.prevter.me/thumbnail/${demon.id}" alt="${demon.name}">
        </div>
        <div class="demon-content">
            <div class="demon-title">#${index} - ${demon.name}</div>
            <div class="demon-info-bar">
                <span>Attempts: ${demon.attempts}</span>
                <span>GDDL Rating: ${demon.gddlRating}</span>
                <span>Enjoyment: ${demon.enjoymentRating}</span>
                <span>ID: ${demon.id}</span>
                <span>Date Beaten: ${formatted_date}</span>
            </div>
            <img class="demon-face" src="${demon.difficultyFace}" alt="demon face">
        </div>
    `;

    return card;
};

function render() {
    const container = document.getElementById("demon-list");
    container.innerHTML = "";

    const filtered = filter_by_date(demons, state.date)
    const sorted = sort_demons(filtered, state.sort_by, state.ascending)

    sorted.forEach((demon, i) => {
        container.appendChild(create_demon_card(demon, i + 1));
    })
}

function setup_events() {
    const sort_select = document.getElementById("sort")
    const sort_button = document.getElementById("sort-order")
    const date_input = document.getElementById("date-input")

    date_input.valueAsDate = state.date

    sort_select.addEventListener("change", () => {
        state.sort_by = sort_select.value;
        render();
    })

    sort_button.addEventListener("click", () => {
        state.ascending = !state.ascending
        sort_button.textContent = state.ascending ? "↑" : "↓";
        render();
    })

    date_input.addEventListener("change", () => {
        state.date = new Date(
            date_input.valueAsDate.getFullYear(),
            date_input.valueAsDate.getMonth(),
            date_input.valueAsDate.getDate()
        );
        render();
    })
}

fetch(`demons.json?t=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
        demons = data;
        setup_events();
        render();
    });

// const date_input = document.getElementById("date-input")
// date_input.valueAsDate = new Date();

// fetch('demons.json?t=' + new Date().getTime())
//     .then(response => response.json())
//     .then(demons => {
//         console.log(demons);

//         // --- render function ---
//         const container = document.getElementById('demon-list');


//         function renderDemons(simulated_date) {
//             container.innerHTML = '';
//             var index = 1
//             demons.forEach((demon) => {

//                 const time_since_epoch = new Date(demon.dateBeaten).getTime() * 1000;
//                 const simulated_time = simulated_date.getTime();

//                 if (time_since_epoch > simulated_time) {
//                     return
//                 }

//                 const card = document.createElement('div');
//                 card.className = 'demon-card';

//                 card.addEventListener("click", () => {
//                     navigator.clipboard.writeText(demon.id)
//                         .then(() => {
//                             const audio = new Audio("assets/copy_id.ogg");
//                             audio.play();
//                             alert("Copied id to clipboard!")
//                         })
//                         .catch(err => {
//                             alert("Failed to copy id due to" + err)
//                         });
//                 });

//                 const timestamp = new Date(demon.dateBeaten * 1000)
//                 const formatted_ts = new Intl.DateTimeFormat("de-DE", {
//                     day: "2-digit",
//                     month: "2-digit",
//                     year: "2-digit"
//                 }).format(timestamp);

//                 card.addEventListener("mouseenter", () => {
//                     const audio = new Audio("assets/hover_click.ogg")
//                     audio.volume = 0.02;
//                     audio.play();
//                 });

//                 card.innerHTML = `
//                     <div class="demon-image-wrapper">
//                         <img class="demon-image" src="https://levelthumbs.prevter.me/thumbnail/${demon.id}" alt="${demon.name}">
//                     </div>
//                     <div class="demon-content">
//                         <div class="demon-title">#${index} - ${demon.name}</div>
//                         <div class="demon-info-bar">
//                             <span>Attempts: ${demon.attempts}</span>
//                             <span>GDDL Rating: ${demon.gddlRating}</span>
//                             <span>Enjoyment: ${demon.enjoymentRating}</span>
//                             <span>ID: ${demon.id}</span>
//                             <span>Date Beaten: ${formatted_ts}</span>
//                         </div>
//                         <img class="demon-face" src="${demon.difficultyFace}" alt="demon face">
//                     </div>
//                 `;
//                 container.appendChild(card);
//                 index += 1
//             });
//         }

//         function sort(sortBy, ascending = false) {
//             demons.sort((a, b) => {
//                 let result;

//                 if (typeof a[sortBy] === 'string') {
//                     result = a[sortBy].localeCompare(b[sortBy]);
//                 } else {
//                     result = a[sortBy] - b[sortBy];
//                 }

//                 return ascending ? result : -result;
//             });
//         };

//         function is_ascending() {
//             const sortButton = document.getElementById("sortOrder");
//             if (sortButton.textContent == "↑") {
//                 return true;
//             } else {
//                 return false;
//             };
//         }

//         function render_with_sort(date, sort_val, asc = false) {
//             sort(sort_val, asc);
//             renderDemons(date);
//         };

//         function get_date() {
//             const year = date_input.valueAsDate.getFullYear();
//             const month = date_input.valueAsDate.getMonth();
//             const day = date_input.valueAsDate.getDate();
//             const date = new Date(year, month, day);
//             console.log(date)
//             return date;
//         };


//         render_with_sort(new Date(), "gddlRating")

//         const sortSelect = document.getElementById('sort');
//         var sortBy = sortSelect.value;
//         var date = get_date();

//         sortSelect.addEventListener('change', () => {
//             sortBy = sortSelect.value;
//             render_with_sort(date, sortBy, is_ascending())
//         });

//         const sortButton = document.getElementById("sortOrder");
//         sortButton.addEventListener("click", () => {
//             if (is_ascending()) {
//                 sortButton.textContent = "↓"
//             } else {
//                 sortButton.textContent = "↑"
//             };
//             render_with_sort(date, sortBy, is_ascending())
//         });

//         date_input.addEventListener("change", () => {
//             date = get_date();
//             console.log(date)
//             render_with_sort(date, sortBy, is_ascending())
//         });
//     })
//     .catch(error => console.error("Error loading demons:", error));