export function sort_demons(list, sort_by, asc) {
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