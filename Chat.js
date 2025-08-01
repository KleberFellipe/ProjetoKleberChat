const form = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
    saveMessages();
});

window.onload = () => {
    loadMessages();
    userInput.focus();
};

function sendMessage() {
    const input = userInput.value.trim();
    if (input === "") return;

    appendMessage(input, false);
    userInput.value = "";
    userInput.disabled = true;
    sendButton.disabled = true;

    appendMessage("Pensando...", true);
    messages.lastChild.classList.add("typing");

    setTimeout(() => {
        messages.removeChild(messages.lastChild); // tira o pensando
        
        // coloca IA de vdd dps
        appendMessage("Entendi. Pode me contar mais sobre isso?", true);

        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();

        saveMessages();
    }, 1500);
}

function appendMessage(content, isBot = true) {
    const msg = document.createElement("div");
    msg.textContent = content;
    msg.classList.add("message");
    msg.classList.add(isBot ? "bot" : "user");    //ve se é a IA ou o usuario
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function saveMessages() {
    localStorage.setItem("chatHistory", messages.innerHTML); //guarda a mensagem
}

function loadMessages() {
    const saved = localStorage.getItem("chatHistory"); //carrega as mensagem
    if (saved) {
        messages.innerHTML = saved;
    }
}
