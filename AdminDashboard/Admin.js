const menuButtons = document.querySelectorAll('#menuList button');

const pageMap = {
    BotaoDashboard: 'Admin.html',
    BotaoVoltar: '../PaginaChat.html',
    BotaoSair: ''
};

menuButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;

        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        const page = pageMap[button.id];
        if (page) {
            setTimeout(() => {
                window.location.href = page;
            }, 300); // tempo para mostrar o ripple
        }
    });
});

function addAlerta({icone, hora, usuario, texto}) {
    const container = document.getElementById('Alertas-container');
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alerta-mensagem';
    alertDiv.innerHTML = `
        <span class="alerta-icone">${icone}</span>
        <span class="alerta-hora">[${hora}]</span>
        <span class="alerta-usuario">${usuario}</span>
        <div class="alerta-texto">Mensagem: "${texto}"</div>
    `;
    container.prepend(alertDiv);

    const avisoAlerta = document.getElementById('avisoAlerta');
    const total = container.querySelectorAll('.alerta-mensagem').length;
    avisoAlerta.textContent = `(${total})`;
}

setTimeout(() => {
    addAlerta({
        icone: '🚨',
        hora: new Date().toLocaleTimeString().slice(0,5),  /*mensagem de teste só para ver se está atualizando em tempo real*/
        usuario: 'Erique S.',
        texto: 'Acho que estou melhorando com o tempo...'
    });
}, 3000);

// Dados de exemplo
const usuarios = [
    { nome: "Joana F.", status: "não estável" },
    { nome: "Erique S.", status: "estável" }
];

const voluntarios = [
    "Psiquiatra Fábio S.",
    "Psiquiatra José R.",
    "Psiquiatra Antonio J."
];

// Contagem
const totalUsuarios = usuarios.length;
const totalVoluntarios = voluntarios.length;
const usuariosEstaveis = usuarios.filter(u => u.status === "estável").length;
const usuariosNaoEstaveis = usuarios.filter(u => u.status !== "estável").length;

// Pie chart
const ctx = document.getElementById('dashboardPie').getContext('2d');
const dashboardPie = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [
            `Usuários (${totalUsuarios})`,
            `Voluntários (${totalVoluntarios})`,
            `Estáveis (${usuariosEstaveis})`,
            `Não Estáveis (${usuariosNaoEstaveis})`
        ],
        datasets: [{
            data: [
                totalUsuarios,
                totalVoluntarios,
                usuariosEstaveis,
                usuariosNaoEstaveis
            ],
            backgroundColor: [
                '#e51b61',
                '#ffccd1',
                '#7ed957',
                '#f784a2'
            ],
            borderColor: '#fff6fa',
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: "'FontePorvoce', Arial, sans-serif",
                        size: 16
                    },
                    color: '#e51b61'
                }
            }
        }
    }
});