document.addEventListener("DOMContentLoaded", main);

function main() {
    // Make the DIV element draggable:
    dragElement(document.querySelector("#resize-test2"));
}

class Element {
    constructor(elmnt) {
        this.dragElement(elmnt);
    }

    dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elmnt.addEventListener("mousedown", dragMouseDown)
    
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            this.addEventListener("mouseup", closeDragElement);
            this.addEventListener("mousemove", elementDrag);
          }
        
          function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // console.log(elmnt.offsetTop - pos2);
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          }
        
          function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        
            this.removeEventListener("mouseup", closeDragElement);
            this.removeEventListener("mousemove", elementDrag);
          }
    }
}



function resizeable(e) {
    // alert("hello")
    this.style.resize = "both";
    console.log(this)
}

