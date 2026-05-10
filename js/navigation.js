document.addEventListener('DOMContentLoaded', () => {
    console.log('Navigation script loaded');

    // Helper to find and link elements by text
    const linkByText = (text, target) => {
        const elements = Array.from(document.querySelectorAll('button, a, span, p'));
        elements.forEach(el => {
            if (el.textContent.trim().toLowerCase() === text.toLowerCase()) {
                el.style.cursor = 'pointer';
                el.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = target;
                };
            }
        });
    };

    // Helper to find and link elements by icon name (Material Symbols)
    const linkByIcon = (iconName, target) => {
        const icons = Array.from(document.querySelectorAll('.material-symbols-outlined'));
        icons.forEach(icon => {
            if (icon.textContent.trim() === iconName) {
                icon.parentElement.style.cursor = 'pointer';
                icon.parentElement.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = target;
                };
            }
        });
    };

    // Global Navigation (Bottom Nav / Top Nav)
    linkByText('Home', 'index.html');
    linkByText('Movies', 'index.html');
    linkByText('TV Shows', 'index.html');
    linkByText('My List', 'watchlist.html');
    linkByText('Profile', 'profile.html');
    linkByIcon('search', 'search.html');
    linkByIcon('person', 'profile.html');
    linkByIcon('home', 'index.html');
    linkByIcon('chevron_left', 'index.html'); // Back buttons usually use this
    linkByText('Back', 'index.html');

    // Specific Screen Links
    const path = window.location.pathname;

    if (path.includes('login.html')) {
        linkByText('Sign In', 'index.html');
        linkByText('Sign up now', 'signup.html');
    } else if (path.includes('signup.html')) {
        linkByText('Get Started', 'index.html');
        linkByText('Sign In', 'login.html');
    } else if (path.includes('movie-details.html')) {
        linkByText('Play', 'player.html');
    } else if (path.includes('index.html') || path === '/' || path.includes('flix-app/')) {
        linkByText('Play', 'player.html');
        // Link all image containers to movie details as a fallback
        document.querySelectorAll('img').forEach(img => {
            if (img.parentElement.tagName === 'DIV' && img.className.includes('object-cover')) {
                img.parentElement.style.cursor = 'pointer';
                img.parentElement.onclick = () => window.location.href = 'movie-details.html';
            }
        });
    } else if (path.includes('player.html')) {
        linkByText('Back', 'movie-details.html');
    } else if (path.includes('profile.html')) {
        linkByText('Sign Out', 'login.html');
    }

    // Special case for 'Back' on player to details
    if (path.includes('player.html')) {
         const backBtn = Array.from(document.querySelectorAll('span, button')).find(el => el.textContent.trim() === 'Back');
         if (backBtn) {
             backBtn.onclick = () => window.location.href = 'movie-details.html';
         }
    }
});

// Mock Interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Handle form submissions for login and signup
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.onsubmit = (e) => {
            e.preventDefault();
            console.log('Form submitted');
            window.location.href = 'index.html';
        };
    });

    // Handle "My List" toggling
    const myListButtons = Array.from(document.querySelectorAll('button, a, span')).filter(el => el.textContent.trim() === 'My List' || el.textContent.trim() === 'Add to List');
    myListButtons.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const isAdded = btn.getAttribute('data-added') === 'true';
            if (isAdded) {
                btn.textContent = 'My List';
                btn.setAttribute('data-added', 'false');
                alert('Removed from My List');
            } else {
                btn.textContent = '✓ Added';
                btn.setAttribute('data-added', 'true');
                alert('Added to My List');
            }
        };
    });
});
