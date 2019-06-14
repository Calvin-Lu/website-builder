/*  Inserts a HTML tag (elementType) into the main canvas. 
    elementType parameter must be a valid HTML element tag.
*/
function insertElement(elementType) {

    const mainCanvas = document.querySelector('#main-canvas')

    const newElement = createElement(elementType)

    if (typeof insertElement.counter == 'undefined') {
        insertElement.counter = 0
    } else {
        insertElement.counter += 1
    }

    newElement.id = `element${insertElement.counter}`

    mainCanvas.appendChild(newElement)

    const temp = new Element(document.querySelector(`#${newElement.id}`))
    
}

function createElement(elementType) {
    switch(elementType) {
        case 'p':
            const textToAdd = prompt("Please enter the text that will be displayed.")
            const newParagraphElement = document.createElement('p')
            newParagraphElement.innerHTML = textToAdd
            return newParagraphElement
        default:
            return document.createElement(elementType)
    }
}
