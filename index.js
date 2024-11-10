import log from 'loglevel';

log.setLevel('debug');  // 'trace', 'debug', 'info', 'warn', 'error'

let sumbitProductBtn = document.getElementById('submit-product-btn');
let createProduct = document.getElementById('create-product');
let products = document.getElementById('products');
let toBuy = document.getElementById('to-buy');
let trash = document.getElementById('trash');
let demo = document.getElementById('demo');
let currentlyDraggedElementId = null;
let isElementDropJustDone = false;
let shoppingList = [];

function allowDrop(event){
    event.preventDefault();
}

function enterActionOnHoveredElement(event){
    let hoveredElement = document.getElementById(event.target.id);
    hoveredElement.style.transition = 'color 0.4s ease, font-weight 0.4s ease';
    hoveredElement.style.fontWeight = 'bold';
    hoveredElement.style.color = '#32c9b1';
    log.debug(`Drag Enter: ${hoveredElement.getAttribute('id')}`);
}

function leaveActionOnHoveredElement(event){
    let hoveredElement = document.getElementById(event.target.id);
    hoveredElement.style.transition = '';
    hoveredElement.style.fontWeight = 'normal';
    hoveredElement.style.color = ''
    log.debug(`Drag Leave: ${hoveredElement.getAttribute('id')}`);
}

function dropElementOnElement(event) {
    event.preventDefault();

    if (event.target.id === currentlyDraggedElementId) {
        log.debug('Dragged Element is the same as a Hovered Element');
        return;
    };

    let draggedElement = document.getElementById(currentlyDraggedElementId);
    let hoveredElement = document.getElementById(event.target.id);
    hoveredElement.style.transition = '';
    hoveredElement.style.fontWeight = 'normal';
    hoveredElement.style.color = ''

    log.debug(`Dragged Element: ${draggedElement.getAttribute('id')}`);
    log.debug(`Hovered Element: ${hoveredElement.getAttribute('id')}`);

    log.debug(`Current shopping list before any modification: ${shoppingList.map(item => item.getAttribute('id')).join(', ')}`);
    let indexOfDraggedElement = shoppingList.indexOf(draggedElement);
    if (shoppingList.includes(draggedElement)) {
        shoppingList.splice(indexOfDraggedElement, 1);
        log.debug(`Current shopping list after remove Dragged Element: ${shoppingList.map(item => item.getAttribute('id')).join(', ')}`);
    }

    let indexOfHoveredElement = shoppingList.indexOf(hoveredElement);
    draggedElement.addEventListener('drop', dropElementOnElement);
    draggedElement.addEventListener('dragenter', enterActionOnHoveredElement);
    draggedElement.addEventListener('dragleave', leaveActionOnHoveredElement);
    log.debug(`Index of Dragged Element: ${indexOfDraggedElement}, Index of Hovered Element: ${indexOfHoveredElement}`);
    if (indexOfHoveredElement == indexOfDraggedElement){
        shoppingList.splice(indexOfHoveredElement + 1, 0, draggedElement);
    } else if (indexOfHoveredElement == shoppingList.length - 1){
        shoppingList.push(draggedElement);
    } else {
        shoppingList.splice(indexOfHoveredElement, 0, draggedElement);
    }
    
    log.debug(`Current shopping list after putting Dragged Element in Hovered Element place: ${shoppingList.map(item => item.getAttribute('id')).join(', ')}`);

    updateToBuy();

    isElementDropJustDone = true;
    currentlyDraggedElementId = null;
}

function updateToBuy() {
    shoppingList.forEach(item => {
        if(toBuy.contains(item)){
            toBuy.removeChild(item);
        }
    });
    shoppingList.forEach(item => {
        toBuy.appendChild(item);
    });
}

function drop(event){
    event.preventDefault();
    if(isElementDropJustDone){
        isElementDropJustDone = false;
        return;
    }
    let droppedElement = document.getElementById(currentlyDraggedElementId);
    if (shoppingList.includes(droppedElement)) return;

    droppedElement.addEventListener('drop', dropElementOnElement);
    droppedElement.addEventListener('dragenter', enterActionOnHoveredElement);
    droppedElement.addEventListener('dragleave', leaveActionOnHoveredElement);
    shoppingList.push(droppedElement);

    updateToBuy();
    currentlyDraggedElementId = null;
}

toBuy.addEventListener('dragover', allowDrop);
toBuy.addEventListener('drop', drop);

function startDragProduct(event){
    currentlyDraggedElementId = event.target.id;
}

function submitProductButtonClicked(){
    let newProduct = document.createElement('p');
    newProduct.innerHTML = createProduct.value;
    newProduct.setAttribute('draggable', 'true');
    let productId = 'product-' + Date.now();
    newProduct.setAttribute('id', productId);
    newProduct.addEventListener('dragstart', startDragProduct);
    newProduct.addEventListener('dragover', allowDrop);
    products.appendChild(newProduct);
}

sumbitProductBtn.addEventListener('click', submitProductButtonClicked);
