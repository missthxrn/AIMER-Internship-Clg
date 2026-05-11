// script.js

/* DATA */
const populationData = {

    india: {
        population: [1050, 1140, 1230, 1310, 1390, 1420],
        male: 51,
        female: 49,
        urban: 35,
        rural: 65
    },

    usa: {
        population: [282, 295, 309, 321, 331, 335],
        male: 49,
        female: 51,
        urban: 82,
        rural: 18
    },

    china: {
        population: [1260, 1300, 1340, 1370, 1410, 1420],
        male: 52,
        female: 48,
        urban: 64,
        rural: 36
    }
};

let currentCountry = "india";

/* MAIN CHART */
let mainChart = new Chart(document.getElementById("mainChart"), {

    type: "bar",

    data: {
        labels: ["2000", "2005", "2010", "2015", "2020", "2023"],

        datasets: [{
            label: "Population",

            data: populationData[currentCountry].population,

            backgroundColor: "#00ffa6",

            borderRadius: 10
        }]
    }
});

/* GENDER CHART */
new Chart(document.getElementById("genderChart"), {

    type: "doughnut",

    data: {
        labels: ["Male", "Female"],

        datasets: [{
            data: [
                populationData[currentCountry].male,
                populationData[currentCountry].female
            ],

            backgroundColor: [
                "#00ffa6",
                "#38bdf8"
            ]
        }]
    }
});

/* AGE CHART */
new Chart(document.getElementById("ageChart"), {

    type: "bar",

    data: {
        labels: ["Children", "Adults", "Seniors"],

        datasets: [{
            data: [30, 55, 15],

            backgroundColor: [
                "#00ffa6",
                "#38bdf8",
                "#8b5cf6"
            ],

            borderRadius: 10
        }]
    }
});

/* COUNTRY CHART */
new Chart(document.getElementById("countryChart"), {

    type: "bar",

    data: {
        labels: ["India", "USA", "China"],

        datasets: [{
            data: [1420, 335, 1420],

            backgroundColor: [
                "#00ffa6",
                "#38bdf8",
                "#f97316"
            ],

            borderRadius: 10
        }]
    }
});

/* URBAN/RURAL */
new Chart(document.getElementById("urbanChart"), {

    type: "pie",

    data: {
        labels: ["Urban", "Rural"],

        datasets: [{
            data: [
                populationData[currentCountry].urban,
                populationData[currentCountry].rural
            ],

            backgroundColor: [
                "#00ffa6",
                "#1e293b"
            ]
        }]
    }
});

/* UPDATE COUNTRY */
document.getElementById("countrySelect").addEventListener("change", (e) => {

    currentCountry = e.target.value;

    updateDashboard();
});

/* UPDATE */
function updateDashboard() {

    const d = populationData[currentCountry];

    mainChart.data.datasets[0].data = d.population;

    mainChart.update();

    document.getElementById("title").textContent =
        currentCountry.toUpperCase() + " Population Dashboard";

    document.getElementById("totalPop").textContent =
        d.population[d.population.length - 1] + "M";

    document.getElementById("malePop").textContent =
        d.male + "%";

    document.getElementById("femalePop").textContent =
        d.female + "%";

    document.getElementById("growthRate").textContent =
        "+12%";
}

/* YEAR SLIDER */
document.getElementById("yearSlider").oninput = (e) => {

    document.getElementById("yearValue").textContent =
        e.target.value;
};

/* TOGGLE THEME */
function toggleTheme() {

    if (document.body.classList.contains("dark")) {

        document.body.classList.remove("dark");

        document.body.classList.add("light");
    }

    else {

        document.body.classList.remove("light");

        document.body.classList.add("dark");
    }
}

/* EXPORT */
function exportChart() {

    const link = document.createElement("a");

    link.download = "population-chart.png";

    link.href = document.getElementById("mainChart").toDataURL();

    link.click();
}

/* INIT */
updateDashboard();