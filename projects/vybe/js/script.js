/* =========================================================
   VYBE — SOCIAL PROFILE
   Interactive Features
   ========================================================= */


/* =========================
   1. FOLLOW BUTTON
   ========================= */

const followButton = document.querySelector(".follow-button");
const followerCount = document.querySelector("#follower-count");

let isFollowing = false;

followButton.addEventListener("click", function () {

    isFollowing = !isFollowing;

    if (isFollowing) {

        followButton.textContent = "Following ✓";
        followerCount.textContent = "24.9K";

    } else {

        followButton.textContent = "Follow";
        followerCount.textContent = "24.8K";

    }

});

/* =========================
   2. POST LIKES
   ========================= */

const likeStats = document.querySelectorAll(".like-stat");

likeStats.forEach(function (likeStat) {

    let isLiked = false;

    const heartIcon = likeStat.querySelector("i");
    const likeCount = likeStat.querySelector(".like-count");

    likeStat.addEventListener("click", function (event) {

        event.stopPropagation();

        isLiked = !isLiked;

        if (isLiked) {

            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa-solid");

            likeStat.classList.add("liked");

            updateLikeCount(likeCount, 1);

        } else {

            heartIcon.classList.remove("fa-solid");
            heartIcon.classList.add("fa-regular");

            likeStat.classList.remove("liked");

            updateLikeCount(likeCount, -1);

        }

    });

});


/* =========================
   3. UPDATE LIKE COUNT
   ========================= */

function updateLikeCount(element, amount) {

    const currentText = element.textContent.trim();

    let currentNumber;

    if (currentText.includes("K")) {

        currentNumber = parseFloat(currentText) * 1000;

    } else {

        currentNumber = parseInt(currentText);

    }

    const newNumber = currentNumber + amount;

    if (newNumber >= 1000) {

        element.textContent = `${(newNumber / 1000).toFixed(1)}K`;

    } else {

        element.textContent = newNumber;

    }

}

/* =========================
   4. PROFILE TABS
   ========================= */

const tabs = document.querySelectorAll(".tab");
const posts = document.querySelectorAll(".post");
const emptyState = document.querySelector("#empty-state");

tabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        /* Remove active state from every tab */

        tabs.forEach(function (item) {
            item.classList.remove("active");
        });


        /* Activate clicked tab */

        tab.classList.add("active");


        /* Get selected category */

        const selectedTab = tab.dataset.tab;

        let visiblePosts = 0;


        /* Filter posts */

        posts.forEach(function (post) {

            const categories = post.dataset.category;

            if (categories.includes(selectedTab)) {

                post.style.display = "";
                visiblePosts++;

            } else {

                post.style.display = "none";

            }

        });


        /* Show empty state when necessary */

        if (visiblePosts === 0) {

            emptyState.style.display = "flex";

        } else {

            emptyState.style.display = "none";

        }

    });

});

/* =========================
   5. MORE MENU
   ========================= */

const moreButton = document.querySelector(".more-button");
const profileMenu = document.querySelector("#profile-menu");

moreButton.addEventListener("click", function (event) {

    event.stopPropagation();

    profileMenu.classList.toggle("show");

});


/* Close menu when clicking elsewhere */

document.addEventListener("click", function () {

    profileMenu.classList.remove("show");

});


/* Prevent clicks inside menu from closing it */

profileMenu.addEventListener("click", function (event) {

    event.stopPropagation();

});


/* =========================
   6. SEARCH PANEL
   ========================= */

const searchButton = document.querySelector("#search-button");
const searchPanel = document.querySelector("#search-panel");
const closeSearch = document.querySelector("#close-search");
const searchInput = document.querySelector("#search-input");


/* Open search */

searchButton.addEventListener("click", function () {

    searchPanel.classList.add("show");

    setTimeout(function () {

        searchInput.focus();

    }, 150);

});


/* Close search */

closeSearch.addEventListener("click", function () {

    searchPanel.classList.remove("show");

});


/* Close search when clicking outside the search box */

searchPanel.addEventListener("click", function (event) {

    if (event.target === searchPanel) {

        searchPanel.classList.remove("show");

    }

});


/* Close search with Escape */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        searchPanel.classList.remove("show");

        profileMenu.classList.remove("show");

    }

});