import { format_date } from "./utils.js"
import { DIFFICULTY_FACES } from "./config.js"

export function create_demon_card(demon, index) {
    const card = document.createElement("div")
    card.className = "demon-card"

    card.addEventListener("click", () => {
        navigator.clipboard.writeText(demon.level_id)
            .then(() => {
                new Audio("assets/copy_id.ogg").play();
                alert("Copied id to clipboard!");
            })
    })
    //61729:HOz2erAr app api encryption key vL0MrtgkpE3x0wlfsZO9JQ==
    const formatted_date = format_date(demon.date_beaten)
    var difficulty_face = DIFFICULTY_FACES[demon.difficulty]

    card.innerHTML = `
        <div class="relative group flex mx-auto w-[97%] h-48 rounded-2xl bg-[#2C2C50] hover:bg-[#36345c] overflow-hidden hover:-translate-y-1 duration-300 drop-shadow-2xl">

            <div class="absolute top-0 left-0 bottom-0 w-[10%] group-hover:w-[11%] duration-300">
                <img src="https://levelthumbs.prevter.me/thumbnail/${demon.level_id}" class="w-full h-full object-cover">
            </div>

            <div class="flex ml-[10%] h-full">
                <h1 class="group-hover:text-[31px] group-hover:ml-10 mt-4 ml-6 text-3xl font-bold duration-300">#${index} - ${demon.name}</h1>
            </div>

            <div class="absolute left-[55%] bottom-6 -translate-x-1/2 flex gap-5">
                <h1 class="demon-info">Attempts: ${demon.attempts}</h1>
                <h1 class="demon-info">GDDL Rating: ${demon.gddl_rating}</h1>
                <h1 class="demon-info">Enjoyment: ${demon.enjoyment}</h1>
                <h1 class="demon-info">ID: ${demon.level_id}</h1>
                <h1 class="demon-info">Date Beaten: ${formatted_date}</h1>
            </div>

            <div class="absolute right-10 top-0 bottom-0 flex justify-center items-center w-[10%]">
                <img src="${difficulty_face}" class="absolute w-[63%] h-[63%] object-contain z-10">
            </div>

        </div>
    `;

    return card;
};