const textarea = document.getElementById('diario-textarea');

const menuButtons = document.querySelectorAll('#menuList button');

menuButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;

        const x = e.clientX - rect.left - size / 1.88;
        const y = e.clientY - rect.top - size / 1.97;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('diarioText');
    if (savedText !== null) {
        textarea.value = savedText;
    }
    updateLetterCount();
    updateLastEditDisplay();
});

textarea.addEventListener('input', () => {
    localStorage.setItem('diarioText', textarea.value);
    localStorage.setItem('diarioLastEdit', Date.now());
    updateLetterCount();
    updateLastEditDisplay();
});

function updateLetterCount() {
    const count = textarea.value.length;
    document.getElementById('diario-count').textContent = count;
}

function formatTimeAgo(msAgo) {
    if (msAgo < 60000) return msAgo < 2000 ? "Agora mesmo" : `${Math.floor(msAgo/1000)}s atrás`;
    if (msAgo < 3600000) return `${Math.floor(msAgo/60000)}m atrás`;
    if (msAgo < 86400000) return `${Math.floor(msAgo/3600000)}h atrás`;
    if (msAgo < 31536000000) return `${Math.floor(msAgo/86400000)}d atrás`;
    return `${Math.floor(msAgo/31536000000)}a atrás`;
}

function updateLastEditDisplay() {
    const lastEdit = localStorage.getItem('diarioLastEdit');
    const span = document.getElementById('diario-ultimavez-span');
    if (!lastEdit) {
        span.textContent = "Nunca";
        return;
    }
    const msAgo = Date.now() - Number(lastEdit);
    if (msAgo < 86400000 && new Date(Number(lastEdit)).getDate() === new Date().getDate()) {
        span.textContent = "Hoje";
    } else {
        span.textContent = formatTimeAgo(msAgo);
    }
}

setInterval(updateLastEditDisplay, 1000);