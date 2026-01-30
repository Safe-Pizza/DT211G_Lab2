"use strict";

//ladda DOM
document.addEventListener("DOMContentLoaded", () => {
    readData();
});

//hämta JSON-data
async function fetchData() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

async function readData() {
    const data = await fetchData();

    writeTable(data);

    document.querySelector("#searchInput").addEventListener("input", () => {
        searchFilter(data);
    });
}

function writeTable(tableData) {
    const tableEl = document.querySelector("#tableData");
    tableEl.innerHTML = "";

    tableData.forEach(d => {
        //skapa tr + td element
        const trEl = document.createElement("tr");
        const tdCodeEl = document.createElement("td");
        const tdNameEl = document.createElement("td");
        const tdProgEl = document.createElement("td");

        //lägg till text
        tdCodeEl.innerHTML = d.code;
        tdNameEl.innerHTML = d.coursename;
        tdProgEl.innerHTML = d.progression;

        //lägger till td i tr
        trEl.appendChild(tdCodeEl);
        trEl.appendChild(tdNameEl);
        trEl.appendChild(tdProgEl);

        //skriv ut till DOM
        tableEl.appendChild(trEl);
    });
}

function searchFilter(tableArr) {
    let input = document.querySelector("#searchInput").value.toLowerCase();
    let tableArrFilterd = tableArr.filter((table) =>
        table.code.toLowerCase().includes(input) ||
        table.coursename.toLowerCase().includes(input)
    );

    writeTable(tableArrFilterd);
}