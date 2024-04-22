class ActionManager {
    static actionManager = new this();
    events = ['forward', 'backward', 'clockwise', 'counterclockwise']
    listeners = new Map();

    constructor() {
        return this.constructor.actionManager;
    }

    init() {
        for (let eventType of this.events) {
            this.listeners.set(eventType, []);
        }
        document.addEventListener('keydown', (event) => console.log(event));

    }

    // Registra dei listener da avvisare qualora un evento occorre
    register(event, clbk) {

    }

    unregister (event, clbk) {

    }

    clearEventListeners (event) {

    }
}


