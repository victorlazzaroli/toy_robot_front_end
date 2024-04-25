/**
 * Classe ActionManager per gestire gli eventi e le relative callback.
 * Implementa un meccanismo per registrare e instradare gli eventi.
 */
export class ActionManager {
    // Singleton pattern: istanza statica della classe ActionManager
    static actionManager = new this();
    // Mappa per memorizzare i listener degli eventi
    listeners = new Map();

    constructor() {
        return this.constructor.actionManager;
    }

    /**
     * Metodo per inizializzare ActionManager.
     */
    init() {
        for (let eventType of Object.values(eventTypes)) {
            this.listeners.set(eventType, []);
            document.addEventListener(eventType, this.routeEvent.bind(this));
        }
    }

    // Registra dei listener da avvisare qualora un evento occorra
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

/**
 * Oggetto contenente i tipi di eventi supportati.
 */
export const eventTypes = {
    PLACE: 'place',
    REPORT: 'report',
    FORWARD: 'forward',
    BACKWARD: 'backward',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'

}


