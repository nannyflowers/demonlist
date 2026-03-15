export function string_to_date(string) {
    return new Date(string)
}

export function filter_by_date(list, cutoff) {
    return list.filter(demon => string_to_date(demon.date_beaten) <= cutoff)
}

export function format_date(date) {
    return new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    }).format(string_to_date(date));
}