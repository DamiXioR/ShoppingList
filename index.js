import log from 'loglevel';

log.setLevel('debug');  // 'trace', 'debug', 'info', 'warn', 'error'

let sumbitProductBtn = document.getElementById('submit-product-btn');
let createProduct = document.getElementById('create-product');
let products = document.getElementById('products');
let toBuy = document.getElementById('to-buy');
let trash = document.getElementById('trash');
let demo = document.getElementById('demo');
let currentlyDraggedItemId = null;
let isItemDropJustDone = false;
let shoppingList = [];

function allowDrop(event){
    event.preventDefault();
}

function enterActionOnHoveredItem(event){
    let hoveredItem = document.getElementById(event.target.id);
    hoveredItem.style.transition = 'color 0.4s ease, font-weight 0.4s ease';
    hoveredItem.style.fontWeight = 'bold';
    hoveredItem.style.color = '#32c9b1';
    log.debug(`Drag Enter: ${hoveredItem.getAttribute('id')}`);
}

function leaveActionOnHoveredItem(event){
    let hoveredItem = document.getElementById(event.target.id);
    hoveredItem.style.transition = '';
    hoveredItem.style.fontWeight = 'normal';
    hoveredItem.style.color = ''
    log.debug(`Drag Leave: ${hoveredItem.getAttribute('id')}`);
}

function dropItemOnItem(event) {
    event.preventDefault();

    if (event.target.id === currentlyDraggedItemId) {
        log.debug('Dragged Item is the same as a Hovered Item');
        return;
    };

    let draggedItem = document.getElementById(currentlyDraggedItemId);
    let hoveredItem = document.getElementById(event.target.id);
    hoveredItem.style.transition = '';
    hoveredItem.style.fontWeight = 'normal';
    hoveredItem.style.color = ''

    draggedItem.addEventListener('drop', dropItemOnItem);
    draggedItem.addEventListener('dragenter', enterActionOnHoveredItem);
    draggedItem.addEventListener('dragleave', leaveActionOnHoveredItem);

    log.debug(`Dragged Item: ${draggedItem.getAttribute('id')}`);
    log.debug(`Hovered Item: ${hoveredItem.getAttribute('id')}`);
    log.debug(`Current shopping list: ${shoppingList.map(item => item.getAttribute('id')).join(', ')}`);

    let indexOfDraggedItem = shoppingList.includes(draggedItem) ? shoppingList.indexOf(draggedItem) : null;
    let indexOfHoveredItem = shoppingList.indexOf(hoveredItem);

    log.debug(`Index of Dragged Item: ${indexOfDraggedItem}, Index of Hovered Item: ${indexOfHoveredItem} before adding dragged`);

    const FIRST_SL_ITEM = 0;
    const LAST_SL_ITEM = shoppingList.length - 1;
    const PENULTIMATE_SL_ITEM = shoppingList.length - 2;

    log.debug(`Index of the last item ${LAST_SL_ITEM}`);
    log.debug(`Index of the penultimate item ${PENULTIMATE_SL_ITEM}`);
    log.debug(`Shopping list size ${shoppingList.length}`);

    if(indexOfDraggedItem == null){
         if (indexOfHoveredItem >= 0 && indexOfHoveredItem < PENULTIMATE_SL_ITEM){
            log.debug(`${draggedItem.getAttribute('id')} is a new item. Place at the hovered item.`);
            shoppingList.splice(indexOfHoveredItem, 0, draggedItem);
         } else if (indexOfHoveredItem == PENULTIMATE_SL_ITEM){
            log.debug(`${draggedItem.getAttribute('id')} is a new item. The hovered item is the penultimate one in the list.`);
            shoppingList.splice(indexOfHoveredItem + 1, 0, draggedItem);
         } else if (indexOfHoveredItem == LAST_SL_ITEM){
            log.debug(`${draggedItem.getAttribute('id')} is a new item. Hovered item is the last on the list.`);
            shoppingList.push(draggedItem);
         }
    } else {
        let draggedItemHigherFactor = indexOfDraggedItem > indexOfHoveredItem ? 1 : 0;
        if (indexOfHoveredItem == FIRST_SL_ITEM){
            log.debug(`${draggedItem.getAttribute('id')} exists. Hovered item is the last on the list, put dragged item first.`);
            shoppingList.unshift(draggedItem);
            shoppingList.splice(indexOfDraggedItem + draggedItemHigherFactor, 1);
        } else if (indexOfHoveredItem == LAST_SL_ITEM) {
            log.debug(`${draggedItem.getAttribute('id')} exists. Hovered item is the last on the list.`);
            shoppingList.push(draggedItem);
            shoppingList.splice(indexOfDraggedItem + draggedItemHigherFactor, 1);
        } else if (draggedItemHigherFactor){
            log.debug(`${draggedItem.getAttribute('id')} exists. Pushed on hovered Item place. Dragged is higher than hovered.`);
            shoppingList.splice(indexOfHoveredItem, 0, draggedItem);
            shoppingList.splice(indexOfDraggedItem + draggedItemHigherFactor, 1);
        } else {
            log.debug(`${draggedItem.getAttribute('id')} exists. Pushed on hovered Item place. Dragged is lower than hovered.`);
            shoppingList.splice(indexOfHoveredItem + 1, 0, draggedItem);
            shoppingList.splice(indexOfDraggedItem + draggedItemHigherFactor, 1);
        }
    }

    log.debug(`Current shopping list after putting Dragged Item in Hovered Item place: ${shoppingList.map(item => item.getAttribute('id')).join(', ')}`);

    updateToBuy();

    isItemDropJustDone = true;
    currentlyDraggedItemId = null;
}

function removeToBuy() {
    shoppingList.forEach(item => {
        if(toBuy.contains(item)){
            toBuy.removeChild(item);
        }
    });
}

function addToBuy(){
    shoppingList.forEach(item => {
        toBuy.appendChild(item);
    });
}
function updateToBuy() {
    removeToBuy();
    addToBuy();
}

function drop(event){
    event.preventDefault();
    if(isItemDropJustDone){
        isItemDropJustDone = false;
        return;
    }
    let droppedItem = document.getElementById(currentlyDraggedItemId);
    if (shoppingList.includes(droppedItem)) return;

    droppedItem.addEventListener('drop', dropItemOnItem);
    droppedItem.addEventListener('dragenter', enterActionOnHoveredItem);
    droppedItem.addEventListener('dragleave', leaveActionOnHoveredItem);
    shoppingList.push(droppedItem);

    updateToBuy();
    currentlyDraggedItemId = null;
}

function startDragProduct(event){
    currentlyDraggedItemId = event.target.id;
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

toBuy.addEventListener('dragover', allowDrop);
toBuy.addEventListener('drop', drop);

function dropInTrash(event){
    event.preventDefault();
    log.debug(`Shopping list size before trash ${shoppingList.length}`);
    let draggedItem = document.getElementById(currentlyDraggedItemId);
    if(shoppingList.includes(draggedItem)){
        log.debug(`Dragged Item before remove: ${draggedItem.getAttribute('id')}`);
        removeToBuy();
        const indexOfDraggedItem = shoppingList.indexOf(draggedItem);
        shoppingList.splice(indexOfDraggedItem, 1);
        addToBuy();
    } else {
        Array.from(products.childNodes).indexOf(draggedItem) !== -1 ? products.removeChild(draggedItem) : null;
    }
    log.debug(`Shopping list size after trash ${shoppingList.length}`);
    currentlyDraggedItemId = null;
}

trash.addEventListener('dragover', allowDrop);
trash.addEventListener('drop', dropInTrash);
