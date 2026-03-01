// --- Matrix Digital Rain ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%+-/~{[|`]}日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'.split('');
const fontSize = 16;
let columns = canvas.width / fontSize;

let drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    // Translucent black background to show trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Green text
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        // Add random brightness variation for more authentic look
        if (Math.random() > 0.95) {
            ctx.fillStyle = '#FFF'; // white head
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            ctx.fillStyle = '#0F0';
        } else {
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33); // ~30 FPS

window.addEventListener('resize', () => {
    resizeCanvas();
    // Re-initialize columns and drops on resize
    columns = canvas.width / fontSize;
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
});

// --- Typewriter Effect ---
const textToType = "a Developer & Designer.";
const typeWriterElement = document.getElementById("typewriter");
let index = 0;
const typingSpeed = 100;

function typeWriter() {
    if (index < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Terminal-style block cursor blink
        typeWriterElement.style.borderRight = "10px solid #0f0";
        setInterval(() => {
            typeWriterElement.style.borderColor =
                typeWriterElement.style.borderColor === 'transparent' ? '#0f0' : 'transparent';
        }, 500);
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
    "PHONE: +91 9360765246"
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
                // Done typing, add the blinking cursor
                contactReveal.innerHTML += '<span id="contact-cursor" style="border-right: 10px solid #0f0; margin-left: 5px;"></span>';
                const cursor = document.getElementById('contact-cursor');
                if (cursor) {
                    contactCursorIntervalId = setInterval(() => {
                        cursor.style.borderColor = cursor.style.borderColor === 'transparent' ? '#0f0' : 'transparent';
                    }, 500);
                }
            }
        }

        typeContact();
    });

    if (contactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If it goes out of view, reset it
                if (!entry.isIntersecting) {
                    resetContactReveal();
                }
            });
        }, { threshold: 0 }); // Trigger when section is out of view

        observer.observe(contactSection);
    }
}