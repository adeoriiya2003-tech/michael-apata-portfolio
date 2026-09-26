// ================================
// NEXORA ADMIN DASHBOARD
// JAVASCRIPT
// ================================


// ================================
// GET HTML ELEMENTS
// ================================

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarClose = document.getElementById("sidebarClose");

const notificationBtn = document.getElementById("notificationBtn");
const notificationDropdown = document.getElementById("notificationDropdown");

const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

const dashboardSearch = document.getElementById("dashboardSearch");

const transactionSearch = document.getElementById("transactionSearch");
const transactionRows = document.querySelectorAll(".transaction-row");
const noTransactionResults = document.getElementById("noTransactionResults");

const chartFilterButtons = document.querySelectorAll(".chart-filter-btn");
const chartBars = document.querySelectorAll(".bar");

const dateFilter = document.getElementById("dateFilter");
const downloadReportBtn = document.getElementById("downloadReportBtn");

const totalRevenue = document.getElementById("totalRevenue");
const totalOrders = document.getElementById("totalOrders");
const totalCustomers = document.getElementById("totalCustomers");
const conversionRate = document.getElementById("conversionRate");

const viewAllTransactionsBtn = document.getElementById("viewAllTransactionsBtn");
const viewActivityBtn = document.getElementById("viewActivityBtn");

const navLinks = document.querySelectorAll(".nav-link");


// ================================
// MOBILE SIDEBAR
// ================================

const sidebarOverlay = document.getElementById("sidebarOverlay");


menuToggle.addEventListener("click", function () {

    sidebar.classList.add("show-sidebar");

    sidebarOverlay.classList.add("show-overlay");

});


sidebarClose.addEventListener("click", function () {

    sidebar.classList.remove("show-sidebar");

    sidebarOverlay.classList.remove("show-overlay");

});


sidebarOverlay.addEventListener("click", function () {

    sidebar.classList.remove("show-sidebar");

    sidebarOverlay.classList.remove("show-overlay");

});


// ================================
// NOTIFICATION DROPDOWN
// ================================

notificationBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    notificationDropdown.classList.toggle("show");

    profileDropdown.classList.remove("show");

});


// ================================
// PROFILE DROPDOWN
// ================================

profileBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    profileDropdown.classList.toggle("show");

    notificationDropdown.classList.remove("show");

});


// ================================
// CLOSE DROPDOWNS
// WHEN CLICKING OUTSIDE
// ================================

document.addEventListener("click", function (event) {

    if (!notificationDropdown.contains(event.target) &&
        !notificationBtn.contains(event.target)) {

        notificationDropdown.classList.remove("show");

    }


    if (!profileDropdown.contains(event.target) &&
        !profileBtn.contains(event.target)) {

        profileDropdown.classList.remove("show");

    }

});


// ================================
// TRANSACTION SEARCH
// ================================

transactionSearch.addEventListener("input", function () {

    const searchValue = transactionSearch.value.toLowerCase();

    let visibleRows = 0;


    transactionRows.forEach(function (row) {

        const rowText = row.textContent.toLowerCase();


        if (rowText.includes(searchValue)) {

            row.style.display = "";

            visibleRows++;

        } else {

            row.style.display = "none";

        }

    });


    if (visibleRows === 0) {

        noTransactionResults.style.display = "block";

    } else {

        noTransactionResults.style.display = "none";

    }

});


// ================================
// DASHBOARD SEARCH
// ================================

dashboardSearch.addEventListener("input", function () {

    const searchValue = dashboardSearch.value.toLowerCase();

    const searchableItems = document.querySelectorAll(
        ".nav-link, .stat-card, .transactions-card, .activity-card, .insights-card"
    );


    searchableItems.forEach(function (item) {

        const itemText = item.textContent.toLowerCase();


        if (itemText.includes(searchValue) || searchValue === "") {

            item.style.opacity = "1";

        } else {

            item.style.opacity = "0.35";

        }

    });

});


// ================================
// MONTHLY / WEEKLY CHART DATA
// ================================

const monthlyData = [
    42, 55, 48, 68, 62, 78,
    85, 72, 90, 82, 94, 88
];


const weeklyData = [
    58, 72, 65, 86, 75, 92,
    68, 84, 96, 79, 88, 100
];


chartFilterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        chartFilterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const selectedPeriod = button.dataset.period;


        let selectedData;


        if (selectedPeriod === "monthly") {

            selectedData = monthlyData;

        } else {

            selectedData = weeklyData;

        }


        chartBars.forEach(function (bar, index) {

            const value = selectedData[index];


            bar.style.height = value + "%";


            const valueLabel = bar.querySelector(".bar-value");


            if (valueLabel) {

                valueLabel.textContent = "$" + value + "k";

            }

        });

    });

});


// ================================
// DATE FILTER
// ================================

dateFilter.addEventListener("change", function () {

    const selectedDate = dateFilter.value;


    if (selectedDate === "today") {

        totalRevenue.textContent = "$3,840";
        totalOrders.textContent = "128";
        totalCustomers.textContent = "356";
        conversionRate.textContent = "5.92%";

    }


    if (selectedDate === "week") {

        totalRevenue.textContent = "$18,640";
        totalOrders.textContent = "684";
        totalCustomers.textContent = "2,180";
        conversionRate.textContent = "6.21%";

    }


    if (selectedDate === "month") {

        totalRevenue.textContent = "$84,920";
        totalOrders.textContent = "2,468";
        totalCustomers.textContent = "12,580";
        conversionRate.textContent = "6.84%";

    }


    if (selectedDate === "year") {

        totalRevenue.textContent = "$925,480";
        totalOrders.textContent = "28,942";
        totalCustomers.textContent = "84,520";
        conversionRate.textContent = "7.14%";

    }

});


// ================================
// DOWNLOAD REPORT BUTTON
// ================================

downloadReportBtn.addEventListener("click", function () {

    const selectedDate = dateFilter.options[
        dateFilter.selectedIndex
    ].text;


    alert(
        "Your " +
        selectedDate +
        " business report is being prepared!"
    );

});


// ================================
// ACTIVE SIDEBAR NAVIGATION
// ================================

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (navLink) {

            navLink.classList.remove("active");

        });


        link.classList.add("active");

    });

});


// ================================
// VIEW ALL TRANSACTIONS
// ================================

viewAllTransactionsBtn.addEventListener(
    "click",
    function () {

        transactionRows.forEach(function (row) {

            row.style.display = "";

        });


        transactionSearch.value = "";

        noTransactionResults.style.display = "none";


        alert(
            "All available transactions are now displayed."
        );

    }
);


// ================================
// VIEW ALL ACTIVITY
// ================================

viewActivityBtn.addEventListener("click", function () {

    alert(
        "More business activities will appear here."
    );

});