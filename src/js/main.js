"use strict";
//lagra array från API globalt
let allTableData = [];

//ladda DOM
document.addEventListener("DOMContentLoaded", async () => {
    fetchData();

    //händelselyssnare för sökfunktion
    document.querySelector("#searchInput").addEventListener("input", () => {
        searchFilter(allTableData);
    });
});

//hämta JSON-data
async function fetchData() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema.json");
        const data = await response.json();

        //lagra i global variabel
        allTableData = data;

        writeTable(data);
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//skriver ut tabell till DOM
function writeTable(tableDatas) {
    const tableEl = document.querySelector("#tableData");
    tableEl.innerHTML = "";

    tableDatas.forEach(d => {
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

//fliter för input sök
function searchFilter(tableArr) {
    let input = document.querySelector("#searchInput").value.toLowerCase();
    //filter för ny array från sök-input
    let tableArrFilterd = tableArr.filter((table) =>
        table.code.toLowerCase().includes(input) ||
        table.coursename.toLowerCase().includes(input)
    );

    writeTable(tableArrFilterd);
}