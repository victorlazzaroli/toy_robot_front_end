import '../css/robot.css'
import {ActionManager} from "./actionManager.js";

const Directions = {
    NORTH : 'NORTH',
    EAST : 'EAST',
    SOUTH : 'SOUTH',
    WEST : 'WEST',
}

export class Robot {
    positionX;
    positionY;
    face;

    container;
    robotElement;

    actionManager = new ActionManager();

    isMoving = false;
    constructor(container, x, y, face) {
        this.container = container;
        this.positionX = x;
        this.positionY = y;
        this.face = face;
        this.init();
        this.draw();
        this.eventSubscription();
    }

    init() {
        this.robotElement = document.createElement('div');
        this.robotElement.id = 'robot';
        this.container.appendChild(this.robotElement);
    }

    place(x, y, face) {
        this.positionX = x;
        this.positionY = y;
        this.face = face;
    }

    rotate(rotation) {
        const DirectionsList = [Directions.NORTH, Directions.EAST, Directions.SOUTH, Directions.WEST];
        const rotationMultiply = rotation === 'clockwise' ? 1 : -1;

        let newDirectionIndex = (DirectionsList.findIndex(el => el === this.face) + rotationMultiply) % DirectionsList.length;
        if (newDirectionIndex < 0) {
            newDirectionIndex = DirectionsList.length + newDirectionIndex;
        }

        this.face = DirectionsList[newDirectionIndex];
        this.draw();
    }

    move(direction) {
        const step = 100;
        const directionFactor = direction === 'backward' ? 1 : -1;


        if (this.face === Directions.EAST) {
            this.positionX -= directionFactor * step;
        } else if (this.face === Directions.WEST) {
            this.positionX += directionFactor * step;
        } else if (this.face === Directions.NORTH) {
            this.positionY += directionFactor * step;
        } else if (this.face === Directions.SOUTH) {
            this.positionY -= directionFactor * step;
        }
        this.draw();
    }

    draw() {
        const DirectionsList = [Directions.NORTH, Directions.EAST, Directions.SOUTH, Directions.WEST];
        const rotation = DirectionsList.findIndex(el => el === this.face);
        // Set the reference system to the top left vertex
        this.robotElement.style.transformOrigin = `0% 0%`;
        this.robotElement.style.transform = `translateX(${this.positionX}%) translateY(${this.positionY}%)`;
        // Set the rotation axis to the robot center
        this.robotElement.style.transformOrigin = `${this.positionX + 50}% ${this.positionY + 50}%`;
        this.robotElement.style.rotate = (`${rotation*90}deg`)
    }

    eventSubscription() {
        this.actionManager.register('forward', this.move.bind(this));
        this.actionManager.register('backward', this.move.bind(this));
        this.actionManager.register('clockwise', this.rotate.bind(this));
        this.actionManager.register('counterclockwise', this.rotate.bind(this));
    }
}
