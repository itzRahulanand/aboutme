// --- Space Parallax ---
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Generate Stars (3 Depth Layers)
const stars = [];
const numStars = 400;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * 2000 - 1000, // Spread widely for horizontal scrolling
        y: Math.random() * 8000 - 1000, // Spread deeply for vertical scrolling
        size: Math.random() * 1.5 + 0.5,
        depth: Math.random() * 3 + 1, // 1 is close (fast), 4 is far (slow)
        opacity: Math.random() * 0.8 + 0.2
    });
}

// Generate Space Objects (Meteors/Satellites)
const objects = [];
for (let i = 0; i < 15; i++) {
    objects.push({
        x: Math.random() * width,
        y: Math.random() * 6000 + 500, // Spread down the page
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 2 + 1,
        depth: Math.random() * 1.5 + 0.5 // Mostly close
    });
}

let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

function drawSpace() {
    ctx.clearRect(0, 0, width, height);

    // In Light Mode, hide the space canvas
    if (document.body.classList.contains('light-mode')) {
        requestAnimationFrame(drawSpace);
        return;
    }

    // Draw Stars
    stars.forEach(star => {
        // Parallax scroll effect
        let px = (star.x - (scrollY * 0.1 / star.depth)) % width;
        if (px < 0) px += width;

        let py = (star.y - (scrollY / star.depth)) % height;
        if (py < 0) py += height;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, star.size / star.depth, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw Moving Space Objects (Meteors/Comets)
    objects.forEach(obj => {
        obj.x += obj.speedX;
        obj.y += obj.speedY; // Natural movement

        let px = (obj.x - (scrollY / obj.depth)) % width;
        if (px < 0) px += width;

        let py = (obj.y - (scrollY / obj.depth)) % height;
        if (py < 0) py += height;

        // Draw meteor head
        ctx.fillStyle = 'rgba(150, 200, 255, 0.9)'; // Cosmic blue/white
        ctx.beginPath();
        ctx.arc(px, py, obj.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw meteor tail
        ctx.strokeStyle = 'rgba(150, 200, 255, 0.2)';
        ctx.lineWidth = obj.size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - obj.speedX * 15, py - obj.speedY * 15 - (scrollY * 0.1));
        ctx.stroke();
    });

    requestAnimationFrame(drawSpace);
}

drawSpace();

// --- Typewriter Effect ---
const textToType = "Developer & Designer.";
const typeWriterElement = document.getElementById("typewriter");
let index = 0;
const typingSpeed = 100;

function typeWriter() {
    if (index < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Typing finished (cursor removed as requested)
    }
}

window.onload = () => {
    setTimeout(typeWriter, 500);
};

// --- Contact Reveal ---
const revealBtn = document.getElementById('reveal-btn');
const contactReveal = document.getElementById('contact-reveal');
const contactSection = document.getElementById('contact');

// Using your placeholder information. Feel free to modify the strings below!
const contactLines = [
    "EMAIL: mrrahul3142@gmail.com",
    "PHONE: +91 9360765246",
    "GITHUB: https://github.com/itzRahulanand"
];

let contactLineIndex = 0;
let contactCharIndex = 0;
let isTypingContact = false;
let contactTypingTimeoutId = null;
let contactCursorIntervalId = null;

function resetContactReveal() {
    isTypingContact = false;
    clearTimeout(contactTypingTimeoutId);
    clearInterval(contactCursorIntervalId);
    if (contactReveal) contactReveal.innerHTML = '';
    if (revealBtn) revealBtn.style.display = 'inline-block';
    contactLineIndex = 0;
    contactCharIndex = 0;
}

if (revealBtn && contactReveal) {
    revealBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isTypingContact) return;

        isTypingContact = true;
        revealBtn.style.display = 'none'; // Hide button after clicking
        contactReveal.innerHTML = '';
        contactLineIndex = 0;
        contactCharIndex = 0;

        function typeContact() {
            if (!isTypingContact) return;

            if (contactLineIndex < contactLines.length) {
                // Add a line break before starting the second line
                if (contactCharIndex === 0 && contactLineIndex > 0) {
                    contactReveal.innerHTML += "<br>";
                }

                if (contactCharIndex < contactLines[contactLineIndex].length) {
                    // Type the next character
                    contactReveal.innerHTML += contactLines[contactLineIndex].charAt(contactCharIndex);
                    contactCharIndex++;
                    contactTypingTimeoutId = setTimeout(typeContact, 50); // Moderate typing speed
                } else {
                    // Move to the next line
                    contactLineIndex++;
                    contactCharIndex = 0;
                    contactTypingTimeoutId = setTimeout(typeContact, 300); // Pause before the next line
                }
            } else {
                // Done typing (cursor removed as requested)
            }
        }

        typeContact();
    });

    // The contact section observer logic has been removed as requested, so the revealed contact info will remain permanently visible after clicking.
}

// --- Theme Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        // Update icon correctly
        if (document.body.classList.contains('light-mode')) {
            // Moon icon for switching back to dark mode
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        } else {
            // Sun icon for switching to light mode
            themeIcon.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>';
        }
    });
}
