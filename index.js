import log from 'loglevel';

log.setLevel('debug');  // 'trace', 'debug', 'info', 'warn', 'error'

const ADD_PRODUCT_BUTTON = document.getElementById('submit-product-btn');
const CREATE_PRODUCT = document.getElementById('create-product');
const PRODUCTS = document.getElementById('products');
const TO_BUY = document.getElementById('to-buy');
const TRASH = document.getElementById('trash');
let currentlyDraggedItemId = null;
let isItemDropJustDone = false;
let shoppingList = [];

function allowDrop(event){
    event.preventDefault();
}

function enterActionOnHoveredItem(event){
    const hoveredItem = document.getElementById(event.target.id);
    hoveredItem.classList.add('hovered-item');
    log.debug(`Drag Enter: ${hoveredItem.getAttribute('id')}`);
}

function leaveActionOnHoveredItem(event){
    const hoveredItem = document.getElementById(event.target.id);
    hoveredItem.classList.remove('hovered-item');
    log.debug(`Drag Leave: ${hoveredItem.getAttribute('id')}`);
}

function dropItemOnItem(event) {
    event.preventDefault();

    if (event.target.id === currentlyDraggedItemId) {
        log.debug('Dragged Item is the same as a Hovered Item');
        return;
    };

    const draggedItem = document.getElementById(currentlyDraggedItemId);
    const hoveredItem = document.getElementById(event.target.id);
    hoveredItem.classList.remove('hovered-item');

    draggedItem.addEventListener('drop', dropItemOnItem);
    draggedItem.addEventListener('dragenter', enterActionOnHoveredItem);
    draggedItem.addEventListener('dragleave', leaveActionOnHoveredItem);

    log.debug(`Dragged Item: ${draggedItem.getAttribute('id')}`);
    log.debug(`Hovered Item: ${hoveredItem.getAttribute('id')}`);
    log.debug(`Current shopping list: ${shoppingList.map(item => item.getAttribute('id')).join(', ')}`);

    const indexOfDraggedItem = shoppingList.includes(draggedItem) ? shoppingList.indexOf(draggedItem) : null;
    const indexOfHoveredItem = shoppingList.indexOf(hoveredItem);

    log.debug(`Index of Dragged Item: ${indexOfDraggedItem}, Index of Hovered Item: ${indexOfHoveredItem} before adding dragged`);

    const first_sl_item = 0;
    const last_sl_item = shoppingList.length - 1;
    const penultimate_sl_item = shoppingList.length - 2;

    log.debug(`Index of the last item ${last_sl_item}`);
    log.debug(`Index of the penultimate item ${penultimate_sl_item}`);
    log.debug(`Shopping list size ${shoppingList.length}`);

    if(indexOfDraggedItem == null){
         if (indexOfHoveredItem >= 0 && indexOfHoveredItem < penultimate_sl_item){
            log.debug(`${draggedItem.getAttribute('id')} is a new item. Place at the hovered item.`);
            shoppingList.splice(indexOfHoveredItem, 0, draggedItem);
         } else if (indexOfHoveredItem == penultimate_sl_item){
            log.debug(`${draggedItem.getAttribute('id')} is a new item. The hovered item is the penultimate one in the list.`);
            shoppingList.splice(indexOfHoveredItem + 1, 0, draggedItem);
         } else if (indexOfHoveredItem == last_sl_item){
            log.debug(`${draggedItem.getAttribute('id')} is a new item. Hovered item is the last on the list.`);
            shoppingList.push(draggedItem);
         }
    } else {
        let draggedItemHigherFactor = indexOfDraggedItem > indexOfHoveredItem ? 1 : 0;
        if (indexOfHoveredItem == first_sl_item){
            log.debug(`${draggedItem.getAttribute('id')} exists. Hovered item is the first on the list, put dragged item first.`);
            shoppingList.unshift(draggedItem);
            shoppingList.splice(indexOfDraggedItem + draggedItemHigherFactor, 1);
        } else if (indexOfHoveredItem == last_sl_item) {
            log.debug(`${draggedItem.getAttribute('id')} exists. Hovered item is the last on the list.`);
            shoppingList.push(draggedItem);
            shoppingList.splice(indexOfDraggedItem + draggedItemHigherFactor, 1);
        } else if (draggedItemHigherFactor){
            log.debug(`${draggedItem.getAttribute('id')} exists. Pushed on hovered Item place. Dragged item is higher than hovered item.`);
            shoppingList.splice(indexOfHoveredItem, 0, draggedItem);
            shoppingList.splice(indexOfDraggedItem + draggedItemHigherFactor, 1);
        } else {
            log.debug(`${draggedItem.getAttribute('id')} exists. Pushed on hovered Item place. Dragged item is lower than hovered item.`);
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
        if(TO_BUY.contains(item)){
            TO_BUY.removeChild(item);
        }
    });
}

function addToBuy(){
    shoppingList.forEach(item => {
        TO_BUY.appendChild(item);
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
    const newProduct = document.createElement('p');
    newProduct.innerHTML = CREATE_PRODUCT.value;
    newProduct.setAttribute('draggable', 'true');
    const productId = 'product-' + Date.now();
    newProduct.setAttribute('id', productId);
    newProduct.addEventListener('dragstart', startDragProduct);
    newProduct.addEventListener('dragover', allowDrop);
    PRODUCTS.appendChild(newProduct);
}

ADD_PRODUCT_BUTTON.addEventListener('click', submitProductButtonClicked);

TO_BUY.addEventListener('dragover', allowDrop);
TO_BUY.addEventListener('drop', drop);

function dropInTrash(event){
    event.preventDefault();
    log.debug(`Shopping list size before trash ${shoppingList.length}`);
    const draggedItem = document.getElementById(currentlyDraggedItemId);
    if(shoppingList.includes(draggedItem)){
        log.debug(`Dragged Item before remove: ${draggedItem.getAttribute('id')}`);
        removeToBuy();
        const indexOfDraggedItem = shoppingList.indexOf(draggedItem);
        shoppingList.splice(indexOfDraggedItem, 1);
        addToBuy();
    } else {
        Array.from(PRODUCTS.childNodes).indexOf(draggedItem) !== -1 ? PRODUCTS.removeChild(draggedItem) : null;
    }
    log.debug(`Shopping list size after trash ${shoppingList.length}`);
    currentlyDraggedItemId = null;
}

TRASH.addEventListener('dragover', allowDrop);
TRASH.addEventListener('drop', dropInTrash);
