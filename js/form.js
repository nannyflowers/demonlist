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
        alert("Failed fuck you" + JSON.stringify(result))
    }
}

export function setup_form() {
    const open_form_button = document.getElementById("open-form-btn")
    const form_overlay = document.getElementById("form-overlay")
    const cancel_button = document.getElementById("cancel-submit")
    const submit_demon_button = document.getElementById("submit-demon")

    open_form_button.addEventListener("click", () => {
        form_overlay.style.display = "flex"
    })

    cancel_button.addEventListener("click", () => {
        form_overlay.style.display = "none"
    })

    form_overlay.addEventListener("click", (e) => {
        if (e.target === form_overlay) {
            form_overlay.style.display = "none"
        }
    })

    submit_demon_button.addEventListener("click", async () => {
        add_demon()
    })
}