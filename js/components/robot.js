import '../../css/robot.css'
import {ActionManager, eventTypes} from "../services/actionManager.js";
import {ReportModal} from "./report.js";
import {PlaceModal} from "./place.js";

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
    freezeRobot = false;
    placed = false;

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
        this.placed = true;
        this.draw();
    }

    rotate(rotation) {
        if (this.freezeRobot) {
            return;
        }
        const DirectionsList = [Directions.NORTH, Directions.EAST, Directions.SOUTH, Directions.WEST];
        const rotationMultiply = rotation === eventTypes.CLOCKWISE ? 1 : -1;

        let newDirectionIndex = (DirectionsList.findIndex(el => el === this.face) + rotationMultiply) % DirectionsList.length;
        if (newDirectionIndex < 0) {
            newDirectionIndex = DirectionsList.length + newDirectionIndex;
        }

        this.face = DirectionsList[newDirectionIndex];
        this.draw();
    }

    move(direction) {
        if (this.constraintHit(direction) || this.freezeRobot || !this.placed) {
            //console.log('contraint hit')
            return;
        }
        const step = 100;
        const directionFactor = direction === eventTypes.BACKWARD ? 1 : -1;

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
        // Imposta il sistema di riferimento sul vertice in alto a sinistra
        this.robotElement.style.transformOrigin = `0% 0%`;
        this.robotElement.style.transform = `translateX(${this.positionX}%) translateY(${this.positionY}%)`;
        // Imposta l'asse di rotazione al centro del quadrato
        this.robotElement.style.transformOrigin = `${this.positionX + 50}% ${this.positionY + 50}%`;
        this.robotElement.style.rotate = (`${rotation*90}deg`)

        //console.log({x: this.positionX, y: this.positionY, face: this.face})
    }

    // Reistrazione delle callback sull'event manager
    eventSubscription() {
        this.actionManager.register(eventTypes.FORWARD, this.move.bind(this));
        this.actionManager.register(eventTypes.BACKWARD, this.move.bind(this));
        this.actionManager.register(eventTypes.CLOCKWISE, this.rotate.bind(this));
        this.actionManager.register(eventTypes.COUNTERCLOCKWISE, this.rotate.bind(this));
        this.actionManager.register(eventTypes.REPORT, this.report.bind(this));
        this.actionManager.register(eventTypes.PLACE, this.placeModal.bind(this, false));
    }

    // Funzione per il controllo di collisione con i bordi
    constraintHit(direction) {
        return this.positionX === 400 && this.face === Directions.EAST && direction === eventTypes.FORWARD ||
            this.positionX === 0 && this.face === Directions.WEST && direction === eventTypes.FORWARD ||
            this.positionY === 400 && this.face === Directions.SOUTH && direction === eventTypes.FORWARD ||
            this.positionY === 0 && this.face === Directions.NORTH && direction === eventTypes.FORWARD ||

            this.positionX === 0 && this.face === Directions.EAST && direction === eventTypes.BACKWARD ||
            this.positionX === 400 && this.face === Directions.WEST && direction === eventTypes.BACKWARD ||
            this.positionY === 0 && this.face === Directions.SOUTH && direction === eventTypes.BACKWARD ||
            this.positionY === 400 && this.face === Directions.NORTH && direction === eventTypes.BACKWARD ;
    }

    report() {
        const reportModal = new ReportModal();
        this.freezeRobot = true;

        reportModal.open(this.positionX, this.positionY, this.face, () => {this.freezeRobot = false})
    }
    placeModal(disableClose) {
        const placeModal = new PlaceModal();
        this.freezeRobot = true;

        placeModal.open(disableClose, (positionX, positionY, face) => {
            if (positionX && positionY && face) {
                this.place(positionX, positionY, face)
            }
            this.freezeRobot = false
        })
    }
}
