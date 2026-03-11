import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
    "https://eazorqumetqreonpmoer.supabase.co",
    "sb_publishable_z41ao2XbtE-Vmom8Ew2dWg_MEqB3ZQR"
)

let demons = []
let state = {
    sort_by: "gddl_rating",
    ascending: false,
    date: new Date(),
};

function string_to_date(string) {
    return new Date(string)
}

function filter_by_date(list, cutoff) {
    return list.filter(demon => string_to_date(demon.date_beaten) <= cutoff)
};

function sort_demons(list, sort_by, asc) {
    return [...list].sort((a, b) => {
        let result;

        if (["gddl_rating","attempts","enjoyment"].includes(sort_by)) {
            result = Number(a[sort_by]) - Number(b[sort_by]);
        } else if (sort_by === "date_beaten") {
            result = new Date(a[sort_by]) - new Date(b[sort_by]);
        } else {
            result = String(a[sort_by]).localeCompare(String(b[sort_by]));
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
    }).format(string_to_date(demon.date_beaten));

    var difficulty_face

    if (demon.difficulty == "EASY") {
        difficulty_face = "assets/easy demon.png"
    } else if (demon.difficulty == "MEDIUM") {
        difficulty_face = "assets/medium demon.png"
    } else if (demon.difficulty == "HARD") {
        difficulty_face = "assets/hard demon.png"
    } else if (demon.difficulty == "INSANE") {
        difficulty_face = "assets/insane demon.png"
    } else {
        difficulty_face = "assets/extreme demon.png"
    }

    card.innerHTML = `
        <div class="demon-image-wrapper">
            <img class="demon-image" src="https://levelthumbs.prevter.me/thumbnail/${demon.level_id}" alt="${demon.name}">
        </div>
        <div class="demon-content">
            <div class="demon-title">#${index} - ${demon.name}</div>
            <div class="demon-info-bar">
                <span>Attempts: ${demon.attempts}</span>
                <span>GDDL Rating: ${demon.gddl_rating}</span>
                <span>Enjoyment: ${demon.enjoyment}</span>
                <span>ID: ${demon.level_id}</span>
                <span>Date Beaten: ${formatted_date}</span>
            </div>
            <img class="demon-face" src="${difficulty_face}" alt="demon face">
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

async function load_demons() {
    const {data, error} = await supabase
        .from("demons")
        .select("*")
    
    console.log("DATA:", data);
    console.log("ERROR:", error);
    
    if (error) {
        console.error("Error loading demons:", error);
        return;
    }

    demons = data

    setup_events();
    render();
}

load_demons();

const openFormBtn = document.getElementById("open-form-btn");
const formOverlay = document.getElementById("form-overlay");
const cancelBtn = document.getElementById("cancel-demon");
const submit_demon_button = document.getElementById("submit-demon")

// Open modal
openFormBtn.addEventListener("click", () => {
    formOverlay.style.display = "flex";
});

// Close modal
cancelBtn.addEventListener("click", () => {
    formOverlay.style.display = "none";
});

// Optional: close when clicking outside form
formOverlay.addEventListener("click", (e) => {
    if (e.target === formOverlay) {
        formOverlay.style.display = "none";
    }
});

submit_demon_button.addEventListener("click", () => {
    async function add_demon() {
        const name = document.getElementById("demon-name").value
        const level_id = document.getElementById("level-id").value
        const gddl_rating = document.getElementById("gddl-rating").value
        const attempts = document.getElementById("attempts").value
        const enjoyment = document.getElementById("enjoyment").value
        const date_beaten = document.getElementById("date-beaten").value
        const difficulty = document.getElementById("difficulty").value.toUpperCase();

        const demon = {
            name,
            level_id,
            gddl_rating,
            attempts,
            enjoyment,
            date_beaten,
            difficulty
        }

        const password = prompt("Enter password:")

        const res = await fetch("https://dbworker.hayden-nundy-28.workers.dev/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({password, demon})
        })

        const result = await res.json()
        if (result.success) {
            alert("Demon added!")
            formOverlay.style.display = "none";
        } else {
            alert("Failed: " + JSON.stringify(result))
        }
    }

    add_demon()
});