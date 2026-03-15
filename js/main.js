import { supabase } from "./supabase.js";
import { sort_demons } from "./demons.js";
import { filter_by_date } from "./utils.js";
import { create_demon_card } from "./render.js";
import { setup_form } from "./form.js";

let demons = []

let state = {
    sort_by: "gddl_rating",
    ascending: false,
    date: new Date()
}

function setup_controls() {
  const sort_select = document.getElementById("sort")
  const sort_button = document.getElementById("sort-order")
  const date_input = document.getElementById("date-input")

  sort_select.addEventListener("change", () => {
    state.sort_by = sort_select.value
    render()
  })

  sort_button.addEventListener("click", () => {
    state.ascending = !state.ascending
    render()
  })

  date_input.addEventListener("change", () => {
    state.date = date_input.valueAsDate
    render()
  })

  date_input.valueAsDate = new Date()
}

function render() {
    const container = document.getElementById("demon-list")
    container.innerHTML = ""

    const filtered = filter_by_date(demons, state.date)
    const sorted = sort_demons(filtered, state.sort_by, state.ascending)

    sorted.forEach((demon, i) => {
        container.appendChild(create_demon_card(demon, i + 1))
    })
}

async function load_demons() {
    const { data, error } = await supabase
        .from("demons")
        .select("*")
    
    if (error) {
        console.log(error)
        return
    }

    demons = data
    render()
}

load_demons()
setup_controls()
setup_form()