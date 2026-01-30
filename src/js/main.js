"use strict";

//ladda DOM
document.addEventListener("DOMContentLoaded", () => {
    fetchData("https://webbutveckling.miun.se/files/ramschema.json");
});

//hämta JSON-data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        writeTable(data);
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

function writeTable(tableData) {
    const tableEl = document.querySelector("#tableData");

    tableData.forEach(data => {
        //skapa tr + td element
        const trEl = document.createElement("tr");
        const tdCodeEl = document.createElement("td");
        const tdNameEl = document.createElement("td");
        const tdProgEl = document.createElement("td");

        //lägg till text
        tdCodeEl.innerHTML = data.code;
        tdNameEl.innerHTML = data.coursename;
        tdProgEl.innerHTML = data.progression;

        //lägger till td i tr
        trEl.appendChild(tdCodeEl);
        trEl.appendChild(tdNameEl);
        trEl.appendChild(tdProgEl);

        //skriv ut till DOM
        tableEl.appendChild(trEl);
    });
}