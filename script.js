const pageTitles = {

    dashboard: {
        title: "Operations Dashboard",
        subtitle: "AI-powered monitoring & optimization"
    },

    equipment: {
        title: "Equipment Monitoring",
        subtitle: "Predictive equipment health monitoring"
    },

    trucks: {
        title: "Truck Management",
        subtitle: "AI-powered fleet and material transportation"
    },

    alerts: {
        title: "AI Alerts",
        subtitle: "Predictive alerts and recommended actions"
    },

    analytics: {
        title: "Analytics",
        subtitle: "Operational performance and historical insights"
    }

};


function showPage(pageId, button = null) {

    document.querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active-page");
        });


    const targetPage =
        document.getElementById(pageId);

    if (targetPage) {

        targetPage.classList.add("active-page");
    }


    document.querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("active");
        });


    if (button) {

        button.classList.add("active");

    } else {

        const matchingButton =
            document.querySelector(
                `.nav-item[onclick*="'${pageId}'"]`
            );

        if (matchingButton) {
            matchingButton.classList.add("active");
        }
    }


    const data = pageTitles[pageId];

    if (data) {

        document.getElementById("pageTitle").textContent =
            data.title;

        document.getElementById("pageSubtitle").textContent =
            data.subtitle;
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString(
        "en-IN",
        {
            hour12: false
        }
    );

    const clock =
        document.getElementById("currentTime");

    if (clock) {
        clock.textContent = time;
    }
}


updateClock();

setInterval(updateClock, 1000);


/* =========================================================
   CHART
   ========================================================= */

let flowChart;


function initializeChart() {

    const canvas =
        document.getElementById("flowChart");

    if (!canvas) return;


    const ctx = canvas.getContext("2d");


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            280
        );


    gradient.addColorStop(
        0,
        "rgba(59,130,246,.30)"
    );


    gradient.addColorStop(
        1,
        "rgba(59,130,246,0)"
    );


    flowChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "00:00",
                "03:00",
                "06:00",
                "09:00",
                "12:00",
                "15:00",
                "18:00",
                "21:00"
            ],

            datasets: [

                {
                    label: "Throughput",

                    data: [
                        1080,
                        1120,
                        1180,
                        1210,
                        1260,
                        1295,
                        1270,
                        1284
                    ],

                    borderColor:
                        "#3b82f6",

                    backgroundColor:
                        gradient,

                    fill: true,

                    borderWidth: 2,

                    tension: .4,

                    pointRadius: 0,

                    pointHoverRadius: 4,

                    pointHoverBackgroundColor:
                        "#60a5fa",

                    pointHoverBorderColor:
                        "#fff"
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor:
                        "#0b1727",

                    borderColor:
                        "rgba(148,163,184,.15)",

                    borderWidth: 1,

                    titleColor:
                        "#cbd5e1",

                    bodyColor:
                        "#60a5fa",

                    padding: 10,

                    displayColors: false
                }

            },

            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    },

                    ticks: {

                        color: "#526277",

                        font: {
                            size: 8
                        }
                    }

                },

                y: {

                    beginAtZero: false,

                    suggestedMin: 900,

                    suggestedMax: 1400,

                    grid: {

                        color:
                            "rgba(148,163,184,.06)"
                    },

                    border: {
                        display: false
                    },

                    ticks: {

                        color: "#526277",

                        font: {
                            size: 8
                        }
                    }

                }

            }

        }

    });

}


/* =========================================================
   TRUCK DATA
   ========================================================= */

const trucks = {

    "TR-1031": {

        id: "TR-1031",

        driver: "S. Das",

        location: "Queue Point B",

        status: "Waiting",

        waitTime: "46 min"

    }

};


/* =========================================================
   DISPATCH MODAL
   ========================================================= */

let selectedTruck =
    "TR-1031";


function openDispatchPanel(truckId = "TR-1031") {

    selectedTruck =
        truckId || "TR-1031";


    const truck =
        trucks[selectedTruck];


    if (!truck) {

        showToast(
            "Truck Not Found",
            "The selected truck could not be found."
        );

        return;
    }


    document.getElementById(
        "selectedTruckId"
    ).textContent =
        truck.id;


    document.getElementById(
        "currentTruckLocation"
    ).textContent =
        truck.location;


    document.getElementById(
        "destinationSelect"
    ).value = "";


    document.getElementById(
        "dispatchMessage"
    ).value =
        "Proceed to Loading Point C. Avoid Queue Point B and report when you arrive.";


    document.getElementById(
        "dispatchModal"
    ).classList.add("active");


    document.body.style.overflow =
        "hidden";

}


function openDispatchFromAI() {

    showPage("trucks");

    setTimeout(() => {

        openDispatchPanel("TR-1031");

    }, 250);
}


function closeDispatchPanel() {

    document.getElementById(
        "dispatchModal"
    ).classList.remove("active");


    document.body.style.overflow =
        "";
}


function closeDispatchOutside(event) {

    if (
        event.target.id ===
        "dispatchModal"
    ) {

        closeDispatchPanel();

    }
}


/* =========================================================
   DESTINATION MESSAGE
   ========================================================= */

const destinationMessages = {

    "Loading Point A":
        "Proceed to Loading Point A. Report when you arrive and await further instructions.",

    "Loading Point C":
        "Proceed to Loading Point C. Avoid Queue Point B and report when you arrive.",

    "Stockyard":
        "Proceed directly to the Stockyard. Maintain safe speed and report upon arrival.",

    "Crusher Zone":
        "Proceed to Crusher Zone and report to the assigned loading coordinator upon arrival."

};


document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.id ===
            "destinationSelect"
        ) {

            const destination =
                event.target.value;


            if (
                destination &&
                destinationMessages[destination]
            ) {

                document.getElementById(
                    "dispatchMessage"
                ).value =
                    destinationMessages[destination];
            }

        }

    }
);


/* =========================================================
   SEND TRUCK INSTRUCTION
   ========================================================= */

function sendTruckInstruction() {

    const destination =
        document.getElementById(
            "destinationSelect"
        ).value;


    const message =
        document.getElementById(
            "dispatchMessage"
        ).value.trim();


    if (!destination) {

        showToast(
            "Destination Required",
            "Please select where the truck should be sent."
        );

        return;
    }


    if (!message) {

        showToast(
            "Message Required",
            "Please enter an instruction for the driver."
        );

        return;
    }


    const row =
        document.querySelector(
            `tr[data-truck="${selectedTruck}"]`
        );


    /*
     * The original HTML uses TR-1031 directly,
     * so find the row by searching the first cell.
     */

    let targetRow = null;

    document.querySelectorAll(
        "#truckTable tbody tr"
    ).forEach(tr => {

        const id =
            tr.querySelector(
                "td strong"
            );

        if (
            id &&
            id.textContent.trim() === selectedTruck
        ) {

            targetRow = tr;

        }

    });


    if (targetRow) {

        const statusCell =
            targetRow.querySelector(
                ".table-status"
            );


        if (statusCell) {

            statusCell.textContent =
                "Dispatch Sent";

            statusCell.className =
                "table-status blue-status";
        }


        targetRow.dataset.status =
            "moving";


        targetRow.classList.remove(
            "waiting-row"
        );


        const actionCell =
            targetRow.lastElementChild;


        if (actionCell) {

            actionCell.innerHTML =
                `<span class="dispatch-sent">
                    ✓ Instruction Sent
                </span>`;

        }

    }


    /*
     * Update waiting count
     */

    const waitingCount =
        document.getElementById(
            "waitingCount"
        );


    if (waitingCount) {

        const current =
            parseInt(
                waitingCount.textContent
            ) || 0;


        waitingCount.textContent =
            Math.max(
                0,
                current - 1
            );
    }


    closeDispatchPanel();


    showToast(

        "Instruction Sent",

        `${selectedTruck} has been instructed to move to ${destination}.`

    );

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;


function showToast(title, message) {

    const toast =
        document.getElementById("toast");


    document.getElementById(
        "toastTitle"
    ).textContent =
        title;


    document.getElementById(
        "toastMessage"
    ).textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 4200);
}


/* =========================================================
   TRUCK SEARCH
   ========================================================= */

function searchTruck() {

    const input =
        document.getElementById(
            "truckSearch"
        );


    const query =
        input.value
            .toLowerCase()
            .trim();


    const rows =
        document.querySelectorAll(
            "#truckTable tbody tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent
                .toLowerCase();


        row.style.display =
            text.includes(query)
                ? ""
                : "none";

    });

}


/* =========================================================
   FILTER WAITING TRUCKS
   ========================================================= */

let waitingFilterActive = false;


function filterWaitingTrucks() {

    const rows =
        document.querySelectorAll(
            "#truckTable tbody tr"
        );


    waitingFilterActive =
        !waitingFilterActive;


    rows.forEach(row => {

        if (
            waitingFilterActive &&
            row.dataset.status !== "waiting"
        ) {

            row.style.display =
                "none";

        } else {

            row.style.display =
                "";
        }

    });


    const button =
        document.querySelector(
            ".filter-btn"
        );


    if (button) {

        button.innerHTML =
            waitingFilterActive
                ? "✓ Showing Waiting"
                : "⚑ Waiting";

    }

}


/* =========================================================
   AI ACTIONS
   ========================================================= */

function optimizeFleet() {

    showToast(
        "Fleet Optimization",
        "AI is analyzing waiting trucks and destination demand."
    );


    setTimeout(() => {

        openDispatchPanel(
            "TR-1031"
        );

    }, 1000);

}


function runAIAnalysis() {

    showToast(
        "AI Analysis Running",
        "Analyzing equipment health and predictive indicators."
    );


    setTimeout(() => {

        showToast(
            "Analysis Complete",
            "C-04 requires inspection. Failure probability: 78%."
        );

    }, 1800);

}


function clearAlerts() {

    showToast(
        "Alerts Updated",
        "Resolved alerts have been cleared."
    );

}


/* =========================================================
   ADD DATA ATTRIBUTE TO TR-1031
   ========================================================= */

function prepareTruckRows() {

    document.querySelectorAll(
        "#truckTable tbody tr"
    ).forEach(row => {

        const firstCell =
            row.querySelector(
                "td strong"
            );


        if (!firstCell) return;


        const truckId =
            firstCell.textContent.trim();


        row.setAttribute(
            "data-truck",
            truckId
        );

    });

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeChart();

        prepareTruckRows();

    }
);
let selectedMaintenanceAsset = null;

function initializeMaintenanceButtons() {
    const cards = document.querySelectorAll(
        "#equipment .machine-card"
    );

    cards.forEach((card) => {
        const title = card.querySelector("h3");
        const idElement = card.querySelector(".machine-id");
        const prediction = card.querySelector(".prediction");

        // Only conveyors and crushers are included.
        if (!title || !idElement || !prediction) return;

        const typeText = title.textContent.trim();

        if (!/conveyor|crusher/i.test(typeText)) return;

        // Extract the actual probability from the prediction block.
        const match = prediction.textContent.match(
            /(\d+(?:\.\d+)?)\s*%/
        );

        if (!match) return;

        const probability = Number(match[1]);

        if (
            !Number.isFinite(probability) ||
            probability < 0 ||
            probability > 100
        ) {
            return;
        }

        // Prevent duplicate buttons if initialization runs again.
        if (card.querySelector(".maintenance-btn")) return;

        const button = document.createElement("button");

        button.type = "button";
        button.className = "maintenance-btn";
        button.textContent = "Schedule Maintenance";
        button.setAttribute(
            "aria-label",
            `Schedule maintenance for ${idElement.textContent.trim()}`
        );

        button.addEventListener("click", () => {
            openMaintenance(card, probability);
        });

        card.appendChild(button);
    });
}

function openMaintenance(card, probability) {
    const modal = document.getElementById("maintenanceModal");
    const details = document.getElementById(
        "maintenanceAssetDetails"
    );
    const form = document.getElementById("maintenanceForm");
    const feedback = document.getElementById(
        "maintenanceFeedback"
    );

    if (!modal || !details || !form || !feedback) return;

    const idElement = card.querySelector(".machine-id");
    const titleElement = card.querySelector("h3");
    const healthElement = card.querySelector(
        ".machine-metric strong"
    );
    const statusElement = card.querySelector(".status");
    const predictionElement = card.querySelector(".prediction");

    if (!idElement || !titleElement || !predictionElement) return;

    const assetId = idElement.textContent.trim();
    const assetType = titleElement.textContent.trim();
    const health = healthElement
        ? healthElement.textContent.trim()
        : "Not available";
    const status = statusElement
        ? statusElement.textContent.trim()
        : "Not available";

    selectedMaintenanceAsset = {
        id: assetId,
        type: assetType,
        health,
        status,
        probability
    };

    // Build detail rows safely without inserting untrusted HTML.
    details.replaceChildren();

    const rows = [
        ["Equipment ID", assetId],
        ["Equipment type", assetType],
        ["Equipment health", health],
        ["Current status", status],
        ["Failure probability", `${probability}%`]
    ];

    rows.forEach(([label, value]) => {
        const row = document.createElement("div");
        row.className = "maintenance-detail-row";

        const labelElement = document.createElement("span");
        labelElement.textContent = label;

        const valueElement = document.createElement("strong");
        valueElement.textContent = value;

        if (label === "Failure probability") {
            valueElement.className = "maintenance-risk";
        }

        row.append(labelElement, valueElement);
        details.appendChild(row);
    });

    const priority = document.getElementById(
        "maintenancePriority"
    );
    const action = document.getElementById("maintenanceAction");

    form.reset();

    // Set the recommended priority based on the displayed risk.
    priority.value =
        probability >= 70 ? "High" :
        probability >= 40 ? "Medium" : "Low";

    action.value =
        probability >= 70
            ? "Urgent inspection. Investigate the predicted failure, inspect bearings, vibration, temperature and related components."
            : probability >= 40
                ? "Schedule a preventive inspection and verify the equipment condition."
                : "Perform a routine inspection and monitor equipment condition.";

    feedback.textContent = "";
    feedback.classList.remove("visible");

    const submitButton = form.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = false;
    submitButton.textContent = "Create Maintenance Request";

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    submitButton.focus();
}

function closeMaintenance() {
    const modal = document.getElementById("maintenanceModal");

    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    selectedMaintenanceAsset = null;
}

// Close when clicking the dark overlay.
document.addEventListener("click", (event) => {
    const modal = document.getElementById("maintenanceModal");

    if (modal && event.target === modal) {
        closeMaintenance();
    }
});

// Support Escape to close the dialog.
document.addEventListener("keydown", (event) => {
    const modal = document.getElementById("maintenanceModal");

    if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
    ) {
        closeMaintenance();
    }
});

// Handle maintenance form submission.
function initializeMaintenanceForm() {
    const form = document.getElementById("maintenanceForm");

    if (!form || form.dataset.initialized === "true") return;

    form.dataset.initialized = "true";

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!selectedMaintenanceAsset) return;

        const priority = document.getElementById(
            "maintenancePriority"
        ).value;

        const action = document.getElementById(
            "maintenanceAction"
        ).value.trim();

        const notes = document.getElementById(
            "maintenanceNotes"
        ).value.trim();

        if (!action) return;

        const request = {
            requestId: `MR-${Date.now()}`,
            equipmentId: selectedMaintenanceAsset.id,
            equipmentType: selectedMaintenanceAsset.type,
            failureProbability: selectedMaintenanceAsset.probability,
            health: selectedMaintenanceAsset.health,
            priority,
            action,
            notes,
            createdAt: new Date().toISOString(),
            status: "Pending"
        };

        // Store requests in this browser for prototype testing.
        // A backend is required for shared or permanent records.
        try {
            const saved = JSON.parse(
                localStorage.getItem("texcelerateMaintenanceRequests")
                || "[]"
            );

            saved.push(request);

            localStorage.setItem(
                "texcelerateMaintenanceRequests",
                JSON.stringify(saved)
            );
        } catch (error) {
            console.error("Could not save maintenance request:", error);

            const feedback = document.getElementById(
                "maintenanceFeedback"
            );

            feedback.textContent =
                "The request could not be saved in this browser. " +
                "Please try again or connect a backend.";

            feedback.classList.add("visible");
            return;
        }

        const feedback = document.getElementById(
            "maintenanceFeedback"
        );

        feedback.textContent =
            `Request ${request.requestId} saved locally for ` +
            `${request.equipmentId}. Status: Pending.`;

        feedback.classList.add("visible");

        const submitButton = form.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;
        submitButton.textContent = "Request Saved";

        // Use the existing dashboard toast if available.
        if (typeof showToast === "function") {
            showToast(
                "Maintenance Request Saved",
                `${request.equipmentId} has a pending maintenance request.`
            );
        }
    });
}

function initializeEquipmentMaintenance() {
    initializeMaintenanceButtons();
    initializeMaintenanceForm();
}

// Works whether this script runs before or after DOMContentLoaded.
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeEquipmentMaintenance
    );
} else {
    initializeEquipmentMaintenance();
}