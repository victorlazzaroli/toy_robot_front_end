import '../css/robot.css'
export class Robot {
    positionX;
    positionY;
    face;

    container;
    robotElement;

    isMoving = false;
    constructor(container, x, y, face) {
        this.container = container;
        this.place(x, y, face);
        this.draw();
    }

    place(x, y, face) {
        this.positionX = x;
        this.positionY = y;
        this.face = face;
    }

    rotate(direction) {
        if (direction === 'clockwise') {
            console.log('clockwise')
        }

        if (direction === 'counterclockwise') {
            console.log('counterclockwise')
        }
    }

    move(direction) {
        if (direction === 'backward') {
            console.log('backward')
        }


        if (direction === 'forward') {
            console.log('forward')
        }
    }

    draw() {
        this.robotElement = document.createElement('div');
        this.robotElement.style.transform = `translateX(${this.positionX}px) translateY(${this.positionY}px)`;
        this.robotElement.id = 'robot';
        this.container.appendChild(this.robotElement);
        //     = `
        //     <div id="robot" style="transform: translateX(${this.positionX}px) translateY(${this.positionY}px)">
        //
        //     </div>
        // `
    }
}
