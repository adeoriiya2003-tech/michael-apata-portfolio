/* =========================================
   VÉRA — MAIN JAVASCRIPT
   ========================================= */

/* =========================================
   MOBILE NAVIGATION
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("show")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  const navigationLinks = document.querySelectorAll(".nav-links a");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");

      const icon = menuToggle.querySelector("i");

      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });
}

/* =========================================
   PRODUCT IMAGE GALLERY
   ========================================= */

const mainProductImage = document.getElementById("mainProductImage");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const thumbnailImage = thumbnail.querySelector("img");

    if (!thumbnailImage || !mainProductImage) return;

    mainProductImage.style.opacity = "0";

    setTimeout(() => {
      mainProductImage.src = thumbnailImage.src;

      mainProductImage.style.opacity = "1";
    }, 150);

    thumbnails.forEach((item) => {
      item.classList.remove("active");
    });

    thumbnail.classList.add("active");
  });
});

/* =========================================
   SIZE SELECTION
   ========================================= */

const sizeOptions = document.querySelectorAll(".size-option");

sizeOptions.forEach((size) => {
  size.addEventListener("click", () => {
    sizeOptions.forEach((option) => {
      option.classList.remove("active");
    });

    size.classList.add("active");
  });
});

/* =========================================
   QUANTITY SELECTOR
   ========================================= */

const decreaseQuantity = document.getElementById("decreaseQuantity");
const increaseQuantity = document.getElementById("increaseQuantity");
const quantityDisplay = document.getElementById("quantity");

let quantity = 1;

if (increaseQuantity && decreaseQuantity && quantityDisplay) {
  increaseQuantity.addEventListener("click", () => {
    quantity++;

    quantityDisplay.textContent = quantity;
  });

  decreaseQuantity.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;

      quantityDisplay.textContent = quantity;
    }
  });
}

/* =========================================
   WISHLIST
   ========================================= */

const wishlistButton = document.querySelector(".wishlist-button");

if (wishlistButton) {
  wishlistButton.addEventListener("click", () => {
    const icon = wishlistButton.querySelector("i");

    wishlistButton.classList.toggle("active");

    if (wishlistButton.classList.contains("active")) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  });
}

/* =========================================
   ADD TO CART
   ========================================= */

const addToCartButton = document.getElementById("addToCart");
const cartCount = document.querySelector(".cart-count");

let cartItems = 0;

if (addToCartButton) {
  addToCartButton.addEventListener("click", () => {
    cartItems += quantity;

    if (cartCount) {
      cartCount.textContent = cartItems;

      cartCount.classList.remove("bump");

      void cartCount.offsetWidth;

      cartCount.classList.add("bump");
    }

    addToCartButton.classList.add("added");

    addToCartButton.innerHTML = `
            <span>Added to Cart</span>
            <i class="fa-solid fa-check"></i>
        `;

    setTimeout(() => {
      addToCartButton.classList.remove("added");

      addToCartButton.innerHTML = `
                <span>Add to Cart</span>
                <i class="fa-solid fa-bag-shopping"></i>
            `;
    }, 2000);
  });
}

/* =========================================
   RELATED PRODUCT WISHLIST
   ========================================= */

const quickWishlistButtons = document.querySelectorAll(".quick-wishlist");

quickWishlistButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        button.classList.toggle("active");

        if (button.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});


/* =========================================
   RELATED PRODUCT QUICK ADD
   ========================================= */

const quickAddButtons = document.querySelectorAll(".quick-add");

quickAddButtons.forEach((button) => {

    button.addEventListener("click", () => {

        cartItems++;

        if (cartCount) {

            cartCount.textContent = cartItems;

            cartCount.classList.remove("bump");

            void cartCount.offsetWidth;

            cartCount.classList.add("bump");

        }

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "Quick Add";
        }, 1500);

    });

});

/* =========================================
   SEARCH OVERLAY
   ========================================= */

const searchButton = document.getElementById("searchButton");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");


if (searchButton && searchOverlay) {

    searchButton.addEventListener("click", () => {

        searchOverlay.classList.add("show");

        setTimeout(() => {

            if (searchInput) {
                searchInput.focus();
            }

        }, 300);

    });

}


if (closeSearch && searchOverlay) {

    closeSearch.addEventListener("click", () => {

        searchOverlay.classList.remove("show");

    });

}


if (searchOverlay) {

    searchOverlay.addEventListener("click", (event) => {

        if (event.target === searchOverlay) {

            searchOverlay.classList.remove("show");

        }

    });

}


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && searchOverlay) {

        searchOverlay.classList.remove("show");

    }

});

/* =========================================
   SIZE GUIDE MODAL
   ========================================= */

const sizeGuideButton = document.getElementById("sizeGuideButton");
const sizeModal = document.getElementById("sizeModal");
const closeSizeModal = document.getElementById("closeSizeModal");


if (sizeGuideButton && sizeModal) {

    sizeGuideButton.addEventListener("click", () => {

        sizeModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

}


if (closeSizeModal && sizeModal) {

    closeSizeModal.addEventListener("click", () => {

        sizeModal.classList.remove("show");

        document.body.style.overflow = "";

    });

}


if (sizeModal) {

    sizeModal.addEventListener("click", (event) => {

        if (event.target === sizeModal) {

            sizeModal.classList.remove("show");

            document.body.style.overflow = "";

        }

    });

}

/* =========================================
   SCROLL TO TOP
   ========================================= */

const scrollTop = document.getElementById("scrollTop");


if (scrollTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");

        }

    });


    scrollTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}