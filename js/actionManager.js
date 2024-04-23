export class ActionManager {
    static actionManager = new this();
    listeners = new Map();

    constructor() {
        return this.constructor.actionManager;
    }

    init() {
        for (let eventType of Object.values(eventTypes)) {
            this.listeners.set(eventType, []);
            document.addEventListener(eventType, this.routeEvent.bind(this));
        }
    }

    // Registra dei listener da avvisare qualora un evento occorre
    register(event, clbk) {
        if ( !this.listeners.has(event) ) {
            throw new Error('Invalid event');
        }
        this.listeners.get(event).push(clbk);
    }

    // Funzione che richiama le callback qualora accada un evento tra quelli registrati
    routeEvent(event) {
        if (this.listeners.has(event?.type)) {
            this.listeners.get(event.type).forEach(listener => listener(event.type))
        }
    }
}

export const eventTypes = {
    PLACE: 'place',
    REPORT: 'report',
    FORWARD: 'forward',
    BACKWARD: 'backward',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'

}


