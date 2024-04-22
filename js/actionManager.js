export class ActionManager {
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
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowDown':
                    this.listeners.get('backward').forEach(listener => listener('backward'));
                    break;
                case 'ArrowUp':
                    this.listeners.get('forward').forEach(listener => listener('forward'));
                    break;
                case 'ArrowLeft':
                    this.listeners.get('counterclockwise').forEach(listener => listener('counterclockwise'));
                    break;
                case 'ArrowRight':
                    this.listeners.get('clockwise').forEach(listener => listener('clockwise'));
                    break;
            }
        });

    }

    // Registra dei listener da avvisare qualora un evento occorre
    register(event, clbk) {
        if ( !this.listeners.has(event) ) {
            throw new Error('Invalid event');
        }
        this.listeners.get(event).push(clbk);
    }
}


