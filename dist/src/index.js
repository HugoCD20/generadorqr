import { CanvasLocal } from './canvasLocal.js';
let canvas;
let graphics;
let miCanvas;
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('circlechart');
    graphics = canvas.getContext('2d');
    crearUIGeneradorQR();
});
function crearUIGeneradorQR() {
    const cardBody = document.querySelector('.card-body');
    const form = document.createElement('form');
    form.className = 'mb-3';
    form.id = 'qr-form';
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group mb-3';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.id = 'qr-text';
    input.placeholder = 'URL';
    input.setAttribute('aria-label', 'Texto para QR');
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.type = 'submit';
    button.textContent = 'Generar QR';
    inputGroup.appendChild(input);
    inputGroup.appendChild(button);
    form.appendChild(inputGroup);
    cardBody.appendChild(form);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = input.value.trim();
        if (texto) {
            if (texto.length <= 34) {
                miCanvas = new CanvasLocal(graphics, canvas);
                miCanvas.paint(texto);
            }
            else {
                alert('Cadena demasiado larga');
            }
        }
        else {
            alert('Por favor ingrese un texto o URL para generar el código QR');
        }
    });
}
