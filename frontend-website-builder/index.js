document.addEventListener("DOMContentLoaded", main);

builderApp = {
  activeElements: [],
}

function main() {
    // Make the DIV element draggable:
    resizeTest =  new Element(document.querySelector("#resize-test2"));

    // Toolbox
    dragBtn = document.querySelector('#drag-element-button').children[0];
    dragBtn.addEventListener("click", toolBox.enableDrag);
    resizeBtn = document.querySelector('#resize-element-button').children[0];
    resizeBtn.addEventListener("click", toolBox.enableResize);
}

let toolBox = {
  enableDrag: () => {
    let {activeElements} = builderApp;
    activeElements.forEach(element => {
      element.enableDrag();
    });
  },
  enableResize: () => {
    let {activeElements} = builderApp;
    activeElements.forEach(element => {
      element.enableResize();
    });
  }
}

class Element {
  constructor(element) {
      // store functions so they can be referenced later
      this.dragMouseDownHandler = this.dragMouseDown.bind(this);
      this.elementDragHandler = this.elementDrag.bind(this);
      this.closeDragElementHandler = this.closeDragElement.bind(this);
      this.enableResizeHandler = this.enableResize.bind(this);

      // default settings
      this.element = element;
      this.element.addEventListener("mousedown", this.dragMouseDownHandler);
      this.element.style.position = "absolute";
      this.positions = {pos1: 0, pos2: 0, pos3: 0, pos4: 0};
      builderApp.activeElements.push(this);
  }

  dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.positions.pos3 = e.clientX;
    this.positions.pos4 = e.clientY;
    this.element.addEventListener("mouseup", this.closeDragElementHandler);
    this.element.addEventListener("mousemove", this.elementDragHandler);
  }
  
  elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.positions.pos1 = this.positions.pos3 - e.clientX;
    this.positions.pos2 = this.positions.pos4 - e.clientY;
    this.positions.pos3 = e.clientX;
    this.positions.pos4 = e.clientY;
    
    // set the element's new position:
    this.element.style.top = (this.element.offsetTop - this.positions.pos2) + "px";
    this.element.style.left = (this.element.offsetLeft - this.positions.pos1) + "px";
  }
  
  closeDragElement() {
    // stop moving when mouse button is released:
    this.element.removeEventListener("mousemove", this.elementDragHandler);
    this.element.removeEventListener("mouseup", this.closeDragElementHandler);
  }

  enableDrag() {
    this.element.style.cursor = "move";
    this.element.removeEventListener("mousedown", this.enableResizeHandler);
    this.element.addEventListener("mousedown", this.dragMouseDownHandler);
  }

  enableResize(e) {
    this.element.style.resize = "both";
    this.element.style.cursor = "se-resize";
    this.element.style.overflow = "auto";
    this.element.removeEventListener("mousedown", this.dragMouseDownHandler);
    this.closeDragElement();
  }
}



