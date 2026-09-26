/* =========================================
   SAVORA WEBSITE JAVASCRIPT
========================================= */

/* =========================================
   RESERVATION FORM
========================================= */

const reservationForm = document.getElementById("reservationForm");

const reservationMessage = document.getElementById("reservationMessage");

if (reservationForm) {
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    reservationMessage.innerHTML = `
                <strong>
                    Reservation Request Received!
                </strong>
                <br>
                Thank you, ${name}.
                Your reservation request has been
                received. Our team will contact you
                shortly to confirm your table.
                `;

    reservationMessage.classList.add("show");

    reservationForm.reset();

    reservationMessage.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

/* =========================================
   RESERVATION DATE
========================================= */

const reservationDate = document.getElementById("date");

if (reservationDate) {
  const today = new Date().toISOString().split("T")[0];

  reservationDate.setAttribute("min", today);
}

/* =========================================
   GALLERY FILTER
========================================= */

const filterButtons = document.querySelectorAll(".filter-button");

const galleryItems = document.querySelectorAll(".gallery-item");

if (filterButtons.length > 0) {
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedFilter = button.getAttribute("data-filter");

      /* Remove active class */

      filterButtons.forEach(function (filterButton) {
        filterButton.classList.remove("filter-active");
      });

      /* Add active class */

      button.classList.add("filter-active");

      /* Filter gallery */

      galleryItems.forEach(function (item) {
        const itemCategory = item.getAttribute("data-category");

        if (selectedFilter === "all" || itemCategory === selectedFilter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuIcon = document.querySelector(".menu-icon");

const mainNav = document.querySelector(".main-nav");

if (menuIcon && mainNav) {
  menuIcon.addEventListener("click", function () {
    mainNav.classList.toggle("nav-open");
  });
}

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");

const contactMessageStatus = document.getElementById("contactMessageStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const contactName = document.getElementById("contactName").value;

    contactMessageStatus.innerHTML = `
                <strong>
                    Message Sent!
                </strong>
                <br>
                Thank you, ${contactName}.
                We've received your message and
                will get back to you shortly.
                `;

    contactMessageStatus.classList.add("show");

    contactForm.reset();

    contactMessageStatus.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

/* =========================================
   NEWSLETTER
========================================= */

const newsletterForm = document.getElementById("newsletterForm");

const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newsletterEmail = document.getElementById("newsletterEmail").value;

    newsletterMessage.textContent = `Thank you! ${newsletterEmail} has been subscribed.`;

    newsletterMessage.classList.add("show");

    newsletterForm.reset();
  });
}