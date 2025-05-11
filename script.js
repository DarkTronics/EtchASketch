const grid = document.getElementById('grid');
const sizeSlider = document.getElementById('size-slider');
const sizeValue = document.getElementById('size-value');
const resetBtn = document.getElementById('reset-btn');
const colorBtn = document.getElementById('color-btn');
const eraserBtn = document.getElementById('eraser-btn');

let currentSize = 16;
let currentMode = 'color';
let isDrawing = false;
let randomColor = getRandomColor();

// Initialize grid
createGrid(currentSize);

// Event Listeners
sizeSlider.addEventListener('input', (e) => {
    currentSize = e.target.value;
    sizeValue.textContent = `${currentSize} x ${currentSize}`;
});

sizeSlider.addEventListener('change', () => {
    createGrid(currentSize);
});

resetBtn.addEventListener('click', () => {
    createGrid(currentSize);
});

colorBtn.addEventListener('click', () => {
    currentMode = 'color';
    randomColor = getRandomColor();
    colorBtn.style.backgroundColor = randomColor;
});

eraserBtn.addEventListener('click', () => {
    currentMode = 'eraser';
});

grid.addEventListener('mousedown', () => {
    isDrawing = true;
});

document.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Functions
function createGrid(size) {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        
        gridItem.addEventListener('mouseover', changeColor);
        gridItem.addEventListener('mousedown', changeColor);
        
        grid.appendChild(gridItem);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !isDrawing) return;
    
    if (currentMode === 'color') {
        e.target.style.backgroundColor = randomColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
}

// Initialize color button with random color
colorBtn.style.backgroundColor = randomColor;