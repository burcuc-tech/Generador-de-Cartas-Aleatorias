import "./style.css";

window.onload = function() {

    // Obtener elementos del DOM
const card = document.getElementById('card');
const btnGenerate = document.getElementById('btnGenerate');
const btnAuto = document.getElementById('btnAuto');
const btnStop = document.getElementById('btnStop');
const btnReset = document.getElementById('btnReset');
const inputSpeed = document.getElementById('inputSpeed');
const historialDiv = document.getElementById('historial');

// Arrays de palos y valores
const suits = [
    { symbol: '♠', name: 'spade', color: 'black' },
    { symbol: '♣', name: 'club', color: 'black' },
    { symbol: '♥', name: 'heart', color: 'red' },
    { symbol: '♦', name: 'diamond', color: 'red' }
];

const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Variable para controlar el auto-generador
let historial = [];
let autoGenerateInterval = null;
let autoSpeed = 3000;

// Función auxiliar: generar número aleatorio
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Función para generar una carta aleatoria
let cartasGeneradas = 0;

function generateRandomCard() {

    const randomSuit = suits[getRandomNumber(suits.length)];
    const randomValue = values[getRandomNumber(values.length)];
    
    renderCard(randomSuit, randomValue);
    
    cartasGeneradas++;
    document.getElementById('contador').textContent = 
        `Cartas generadas: ${cartasGeneradas}`;
           historial.push(randomValue + randomSuit.symbol);
        if (historial.length > 5) historial.shift();
        mostrarHistorial();
    }

    function mostrarHistorial() {
 
        historialDiv.innerHTML = '';
        for (let carta of historial) {
            const span = document.createElement('span');
            span.textContent = carta + ' ';

              if (carta.includes('♥') || carta.includes('♦')) {
            span.style.color = 'red';
        } else {
            span.style.color = 'black';
        }

            historialDiv.appendChild(span);
        }
    }


// Función para renderizar la carta en el DOM
function renderCard(suit, value) {
    const topSuit = card.querySelector('.top-suit');
    const number = card.querySelector('.number');
    const bottomSuit = card.querySelector('.bottom-suit');
    
    topSuit.textContent = suit.symbol;
    number.textContent = value;
    bottomSuit.textContent = suit.symbol;
    
    card.className = 'card';
    card.classList.add(suit.name);
    
    // Animación
    card.style.transform = 'scale(0.9)';
    setTimeout(function() {
        card.style.transform = 'scale(1)';
    }, 100);
}

// Event Listeners
btnGenerate.addEventListener('click', generateRandomCard);

    btnReset.addEventListener('click', function() {
        cartasGeneradas = 0;
        historial = [];
        generateRandomCard();
    });

btnAuto.addEventListener('click', function() {
    if (autoGenerateInterval) {
        alert('Ya está en modo automático');
        return;
    }
    
    let speed = Number(inputSpeed.value) * 1000;
    autoGenerateInterval = setInterval(generateRandomCard, speed);
    
    btnAuto.textContent = '✓ Auto-Generando...';
    btnAuto.style.opacity = '0.5';
});

btnStop.addEventListener('click', function() {
    if (autoGenerateInterval) {
        clearInterval(autoGenerateInterval);
        autoGenerateInterval = null;
        
        btnAuto.textContent = 'Auto-Generar';
        btnAuto.style.opacity = '1';
    }
});
 generateRandomCard();
}