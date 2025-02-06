import data from "./Candidates";

function getTotal() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i].votes;
    }
    return sum;
}

export { getTotal }