// Mobile navigation: the HTML button controls the menu with these IDs.
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');
const menuIcon = menuToggle?.querySelector('i');

if (menuToggle && navMenu) {
  // Keep the visible menu state and accessibility attributes in sync.
  function setMenuOpen(isOpen) {
    navMenu.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );

    if (menuIcon) {
      menuIcon.classList.toggle('fa-bars', !isOpen);
      menuIcon.classList.toggle('fa-xmark', isOpen);
    }
  }

  // The button opens and closes the mobile menu.
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    setMenuOpen(isOpen);
  });

  // Selecting a navigation link closes the menu. Hash links scroll smoothly
  // because the existing stylesheet enables scroll-behavior: smooth.
  navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  // Escape closes the menu and returns keyboard focus to its button.
  document.addEventListener('keydown', (event) => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    if (event.key === 'Escape' && isOpen) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  // Clicking outside the open menu dismisses it.
  document.addEventListener('click', (event) => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (isOpen && !clickedInsideMenu && !clickedToggle) {
      setMenuOpen(false);
    }
  });

  // Avoid leaving the mobile menu expanded after returning to desktop width.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
      setMenuOpen(false);
    }
  });
}

// Update the footer year when the year placeholder exists.
const currentYear = document.querySelector('#current-year');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// There is no contact form in the current index.html, so form validation
// is intentionally not added. The existing email links open the user's mail app.

// Project filters show only cards in the selected category.
const projectCards = document.querySelectorAll('.project-card[data-category]');
const filterButtons = document.querySelectorAll('.filter-button[data-filter]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle('is-active', isSelected);
      filterButton.setAttribute('aria-pressed', String(isSelected));
    });

    projectCards.forEach((card) => {
      const matches = selectedCategory === 'all' || card.dataset.category === selectedCategory;
      card.hidden = !matches;
    });
  });
});

// The dialog reuses the title, description, screenshot, and tags already
// present on each project card so its preview stays in sync with the page.
const projectModal = document.querySelector('#project-modal');
const modalClose = document.querySelector('#modal-close');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalTechnologies = document.querySelector('#modal-technologies');
const modalProjectLink = document.querySelector('#modal-project-link');
const modalCodeLink = document.querySelector('#modal-code-link');
const modalUnavailable = document.querySelector('#modal-unavailable');
let cardThatOpenedModal = null;

// Each project preview opens its own repository from the existing View Code button.
const projectRepositories = {
  ecommerce: 'https://github.com/adeoriiya2003-tech/VERA',
  dashboard: 'https://github.com/adeoriiya2003-tech/NEXORA',
  restaurant: 'https://github.com/adeoriiya2003-tech/SAVORA',
  productivity: 'https://github.com/adeoriiya2003-tech/taskflow-todo',
  social: 'https://github.com/adeoriiya2003-tech/VYBE'
};

function setProjectLinkAvailable(isAvailable, projectPath) {
  if (!modalProjectLink || !modalUnavailable) return;

  modalProjectLink.setAttribute('aria-disabled', String(!isAvailable));
  modalProjectLink.tabIndex = isAvailable ? 0 : -1;
  modalUnavailable.hidden = isAvailable;

  if (isAvailable) {
    modalProjectLink.href = projectPath;
    modalUnavailable.textContent = '';
  } else {
    modalProjectLink.removeAttribute('href');
    const folderPath = projectPath.replace(/\/index\.html$/i, '');
    modalUnavailable.textContent = `The project page is not available here yet. Place the existing project files in ${folderPath}/ with index.html at that location, then open the portfolio through a local web server.`;
  }
}

async function checkProjectPage(projectPath) {
  // Browsers block fetch requests to local file:// pages. Use an HTTP server
  // such as VS Code Live Server to check whether the real page is available.
  if (window.location.protocol === 'file:') return false;

  try {
    let response = await fetch(projectPath, { method: 'HEAD', cache: 'no-store' });

    // Some basic web servers do not support HEAD, so retry those with GET.
    if (response.status === 405 || response.status === 501) {
      response = await fetch(projectPath, { method: 'GET', cache: 'no-store' });
    }

    return response.ok;
  } catch (error) {
    // A missing file or unavailable server should disable the link, not break
    // the rest of the portfolio JavaScript.
    return false;
  }
}

async function openProjectPreview(card) {
  if (!projectModal || !modalImage || !modalTitle || !modalDescription || !modalTechnologies) return;

  const image = card.querySelector('.project-image img');
  const title = card.querySelector('.project-meta h3');
  const description = card.querySelector('.project-description');
  const tags = card.querySelectorAll('.project-tags span');
  const projectPath = card.dataset.projectUrl;

  if (!image || !title || !description || !projectPath) return;

  cardThatOpenedModal = card;
  modalImage.src = image.getAttribute('src');
  modalImage.alt = image.alt;
  modalTitle.textContent = title.textContent.trim();
  modalDescription.textContent = description.textContent.trim();
  modalTechnologies.replaceChildren();

  tags.forEach((tag) => {
    const technology = document.createElement('span');
    technology.textContent = tag.textContent.trim();
    modalTechnologies.append(technology);
  });

  if (modalCodeLink) {
    modalCodeLink.href = projectRepositories[card.dataset.category] || 'https://github.com/adeoriiya2003-tech';
  }

  if (modalProjectLink) {
    modalProjectLink.dataset.projectPath = projectPath;
  }

  setProjectLinkAvailable(false, projectPath);

  if (typeof projectModal.showModal === 'function') {
    projectModal.showModal();
    modalClose?.focus();
  }

  const isAvailable = await checkProjectPage(projectPath);
  // Do not update a later preview with the result for a previous card.
  if (projectModal.open && modalProjectLink?.dataset.projectPath === projectPath) {
    setProjectLinkAvailable(isAvailable, projectPath);
  }
}

projectCards.forEach((card) => {
  card.addEventListener('click', () => openProjectPreview(card));

  // Make the whole card usable by keyboard as well as by mouse or touch.
  card.addEventListener('keydown', (event) => {
    if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;

    event.preventDefault();
    openProjectPreview(card);
  });
});

if (projectModal) {
  // Save the path being previewed so asynchronous availability checks cannot
  // accidentally update the next project's button.
  projectModal.addEventListener('close', () => {
    cardThatOpenedModal?.focus();
  });

  projectModal.addEventListener('click', (event) => {
    // Clicking the backdrop targets the dialog itself, outside its panel.
    if (event.target === projectModal) projectModal.close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal.open) {
      event.preventDefault();
      projectModal.close();
    }
  });
}

modalClose?.addEventListener('click', () => projectModal?.close());

modalProjectLink?.addEventListener('click', (event) => {
  if (modalProjectLink.getAttribute('aria-disabled') === 'true') {
    event.preventDefault();
  }
});

// Native <dialog> handles Escape and restores focus when it closes.

// Contact form: validate the visitor's details, then submit without leaving
// this page. Web3Forms sends the message to the inbox connected to this key.
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const contactSubmit = document.querySelector('#contact-submit');

if (contactForm && formStatus && contactSubmit) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = '';
    formStatus.removeAttribute('data-status');

    // Trim text values before checking and sending them.
    const requiredFields = contactForm.querySelectorAll('[required]');
    let hasEmptyField = false;

    requiredFields.forEach((field) => {
      field.value = field.value.trim();
      if (!field.value) hasEmptyField = true;
    });

    if (hasEmptyField || !contactForm.checkValidity()) {
      formStatus.textContent = hasEmptyField
        ? 'Please complete all required fields.'
        : 'Please check that your email address is valid.';
      formStatus.dataset.status = 'error';
      contactForm.reportValidity();
      return;
    }

    const email = contactForm.elements.email.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.dataset.status = 'error';
      contactForm.elements.email.focus();
      return;
    }

    // Web3Forms honeypot: reject a filled bot-only field without sending it.
    if (contactForm.elements.botcheck?.checked) {
      formStatus.textContent = 'Your message could not be submitted. Please try again.';
      formStatus.dataset.status = 'error';
      return;
    }

    const submitLabel = contactSubmit.querySelector('span');
    const originalLabel = submitLabel?.textContent || 'Send Message';
    contactSubmit.disabled = true;
    if (submitLabel) submitLabel.textContent = 'Sending...';
    formStatus.textContent = 'Sending your message...';
    formStatus.dataset.status = 'loading';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });

      const result = await response.json();

      // Only Web3Forms' explicit success response is treated as a sent message.
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Web3Forms could not accept the message.');
      }

      contactForm.reset();
      formStatus.textContent = 'Thanks! Your message was sent successfully.';
      formStatus.dataset.status = 'success';
    } catch (error) {
      formStatus.textContent = 'Sorry, your message could not be sent. Please try again or email me directly.';
      formStatus.dataset.status = 'error';
    } finally {
      contactSubmit.disabled = false;
      if (submitLabel) submitLabel.textContent = originalLabel;
    }
  });
}
