document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('header');
    
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navUl = document.querySelector('nav ul');

    if (hamburgerMenu && navUl) {
        hamburgerMenu.addEventListener('click', () => {
            navUl.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('open')) {
                    navUl.classList.remove('open');
                    hamburgerMenu.classList.remove('open');
                }
            });
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    const activateNavLink = () => {
        let current = '';

        sections.forEach(section => {
            const headerHeight = header ? header.offsetHeight : 0;
            const sectionTop = section.offsetTop - headerHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activateNavLink);
    activateNavLink();
});