function showPage(pageId, button = null) {

    // Hide all pages
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    // Show selected page
    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active-page");
    }

    // Remove active navigation
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    // Activate clicked navigation
    if (button) {
        button.classList.add("active");
    }

    // Change page title
    const titles = {

        dashboard: "Operations Dashboard",

        equipment: "Equipment Monitoring",

        trucks: "Truck Management",

        alerts: "AI Alerts",

        analytics: "AI Analytics"

    };

    document.getElementById("pageTitle").textContent =
        titles[pageId] || "Operations Dashboard";
}


/* ==============================
   LIVE CLOCK
============================== */

function updateClock() {

    const now = new Date();

    const time =
        now.toLocaleTimeString("en-IN", {
            hour12: false
        });

    document.getElementById("currentTime")
        .textContent = time;
}

setInterval(updateClock, 1000);

updateClock();


/* ==============================
   TOAST MESSAGE
============================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* ==============================
   MATERIAL FLOW CHART
============================== */

const flowCanvas =
    document.getElementById("flowChart");

if (flowCanvas) {

    const ctx =
        flowCanvas.getContext("2d");

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            250
        );

    gradient.addColorStop(
        0,
        "rgba(56,224,123,0.30)"
    );

    gradient.addColorStop(
        1,
        "rgba(56,224,123,0)"
    );


    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "00:00",
                "02:00",
                "04:00",
                "06:00",
                "08:00",
                "10:00",
                "12:00",
                "14:00",
                "16:00",
                "18:00",
                "20:00",
                "22:00"
            ],

            datasets: [

                {

                    label: "Material Flow",

                    data: [
                        1010,
                        1080,
                        1120,
                        1090,
                        1170,
                        1210,
                        1260,
                        1240,
                        1300,
                        1280,
                        1310,
                        1284
                    ],

                    borderColor:
                        "#38e07b",

                    backgroundColor:
                        gradient,

                    fill: true,

                    tension: .4,

                    pointRadius: 2

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                x: {

                    grid: {
                        color:
                            "rgba(255,255,255,.03)"
                    },

                    ticks: {
                        color: "#708c82",
                        font: {
                            size: 8
                        }
                    }

                },

                y: {

                    grid: {
                        color:
                            "rgba(255,255,255,.04)"
                    },

                    ticks: {
                        color: "#708c82",
                        font: {
                            size: 8
                        }
                    }

                }

            }

        }

    });
}


/* ==============================
   PERFORMANCE CHART
============================== */

const performanceCanvas =
    document.getElementById(
        "performanceChart"
    );

if (performanceCanvas) {

    new Chart(
        performanceCanvas.getContext("2d"),
        {

            type: "bar",

            data: {

                labels: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],

                datasets: [

                    {

                        label: "Throughput",

                        data: [
                            1170,
                            1210,
                            1190,
                            1240,
                            1270,
                            1310,
                            1284
                        ],

                        backgroundColor:
                            "#38e07b",

                        borderRadius: 5

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        }
    );
}


/* ==============================
   AI EQUIPMENT ANALYSIS
============================== */

function runAIAnalysis() {

    showToast(
        "AI analysis completed. 3 new insights generated."
    );
}


/* ==============================
   TRUCK OPTIMIZATION
============================== */

function optimizeFleet() {

    showToast(
        "AI optimized fleet routes. Estimated waiting time reduced by 8.2%."
    );
}


/* ==============================
   TRUCK SEARCH
============================== */

function searchTruck() {

    const input =
        document.getElementById(
            "truckSearch"
        );

    const search =
        input.value.toLowerCase();

    const rows =
        document.querySelectorAll(
            "#truckTable tbody tr"
        );

    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        if (text.includes(search)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });
}


/* ==============================
   ACKNOWLEDGE ALERT
============================== */

function acknowledgeAlert(button) {

    const alert =
        button.closest(".alert-card");

    alert.style.opacity = "0.45";

    button.textContent =
        "Acknowledged";

    button.disabled = true;

    showToast(
        "Alert acknowledged successfully."
    );
}


/* ==============================
   CLEAR ALERTS
============================== */

function clearAlerts() {

    const alerts =
        document.querySelectorAll(
            ".alert-card"
        );

    let removed = 0;

    alerts.forEach(alert => {

        if (alert.style.opacity === "0.45") {

            alert.remove();

            removed++;

        }

    });

    if (removed > 0) {

        showToast(
            removed + " alert(s) cleared."
        );

    } else {

        showToast(
            "No resolved alerts to clear."
        );

    }
}


/* ==============================
   GENERATE REPORT
============================== */

function generateReport() {

    showToast(
        "AI operational report generated successfully."
    );
}


/* ==============================
   SIMULATED LIVE THROUGHPUT
============================== */

setInterval(() => {

    const element =
        document.getElementById(
            "throughput"
        );

    if (!element) return;

    const value =
        1260 +
        Math.floor(
            Math.random() * 60
        );

    element.innerHTML =
        value + " <small>TPH</small>";

}, 5000);


/* ==============================
   INITIAL AI NOTIFICATION
============================== */

setTimeout(() => {

    showToast(
        "AI detected abnormal vibration in Conveyor C-04."
    );

}, 4000);