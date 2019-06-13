document.addEventListener("DOMContentLoaded", main);

function main() {
    // Make the DIV element draggable:
    resizeTest =  new Element(document.querySelector("#resize-test2"));
}

class Element {
  constructor(element) {
      this.element = element;
      this.element.addEventListener("mousedown", this.dragMouseDown.bind(this));
      this.element.style.position = "absolute";
      this.positions = {pos1: 0, pos2: 0, pos3: 0, pos4: 0};
  }

  dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.positions.pos3 = e.clientX;
    this.positions.pos4 = e.clientY;
    this.element.addEventListener("mouseup", this.closeDragElement.bind(this));
    this.element.addEventListener("mousemove", this.elementDrag.bind(this));
  }
  
  elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.positions.pos1 = this.positions.pos3 - e.clientX;
    this.positions.pos2 = this.positions.pos4 - e.clientY;
    this.positions.pos3 = e.clientX;
    this.positions.pos4 = e.clientY;
    
    // console.log(element.offsetTop - pos2);
    // set the element's new position:
    this.element.style.top = (this.element.offsetTop - this.positions.pos2) + "px";
    this.element.style.left = (this.element.offsetLeft - this.positions.pos1) + "px";
  }
  
  closeDragElement() {
    // stop moving when mouse button is released:
    this.element.removeEventListener("mouseup", this.closeDragElement.bind(this));
    this.element.removeEventListener("mousemove", this.elementDrag.bind(this));
  }

  resizeable(e) {
    // alert("hello")
    this.style.resize = "both";
    this.removeEventListener("mousedown", this.dragMouseDown);
  }
}



