/* THEME TOGGLE */
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

/* REVENUE CHART */
new Chart(document.getElementById("revenueChart"), {

    type: "line",

    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [{
            label: "Revenue",

            data: [12, 18, 22, 19, 28, 34],

            borderColor: "#d8ff62",

            backgroundColor: "rgba(216,255,98,0.18)",

            fill: true,

            tension: 0.4
        }]
    },

    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

/* TOP BOARDS */
new Chart(document.getElementById("productsChart"), {

    type: "bar",

    data: {
        labels: [
            "Longboards",
            "Cruisers",
            "Street",
            "Electric"
        ],

        datasets: [{
            data: [120, 95, 150, 70],

            backgroundColor: [
                "#d8ff62",
                "#8b5cf6",
                "#38bdf8",
                "#f97316"
            ],

            borderRadius: 10
        }]
    },

    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

/* SALES BY REGION */
new Chart(document.getElementById("regionChart"), {

    type: "doughnut",

    data: {
        labels: [
            "California",
            "New York",
            "Texas",
            "Florida"
        ],

        datasets: [{
            data: [40, 20, 25, 15],

            backgroundColor: [
                "#d8ff62",
                "#8b5cf6",
                "#38bdf8",
                "#f97316"
            ]
        }]
    }
});

/* PROFIT VS LOSS */
new Chart(document.getElementById("profitChart"), {

    type: "bar",

    data: {
        labels: ["Profit", "Loss"],

        datasets: [{
            data: [52000, 12000],

            backgroundColor: [
                "#d8ff62",
                "#ff6b6b"
            ],

            borderRadius: 10
        }]
    },

    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

/* MONTHLY ORDERS */
new Chart(document.getElementById("ordersChart"), {

    type: "bar",

    data: {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"
        ],

        datasets: [{
            data: [220, 280, 340, 300, 410, 500],

            backgroundColor: "#8b5cf6",

            borderRadius: 10
        }]
    },

    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
});