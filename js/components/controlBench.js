import '../../css/controlBench.css'
import {eventTypes} from "../services/actionManager.js";

// Classe che visualizza il pannello per muovere il robot
export function setupControlBench(element) {
    const bench = document.createElement('div');
    bench.id = 'controlBench';
    bench.innerHTML = `
        <button type="button" id=${eventTypes.PLACE} aria-label="Set position">
            [P]lace
        </button>
        
        <button type="button" id=${eventTypes.FORWARD} aria-label="Move Forward">
            [F]orward
        </button>
        <button type="button" id=${eventTypes.BACKWARD} aria-label="Move Backward"}>
            [B]ackward
        </button>
        <button type="button" id=${eventTypes.REPORT} aria-label="Get position">
            [R]eport
        </button>
        
        <button type="button" id=${eventTypes.CLOCKWISE} aria-label="Rotate Clockwise">
            [C]lockwise
        </button>
        <button type="button" id=${eventTypes.COUNTERCLOCKWISE} aria-label="Rotate Counterclockwise">
            C[o]unterclockwise
        </button>
    `;

    bench.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && !event.target.disabled) {
            bench.dispatchEvent(new Event(event.target.getAttribute('id'), {bubbles: true}));
        }
    });

    element.appendChild(bench);

    attachEventsToKeyboard();
    return bench;
}
// Funzione che mappa gli eventi da tastiera su eventi gestiti dal event Manager
function attachEventsToKeyboard() {
    document.addEventListener('keydown', (event) => {
        let eventType;
        switch (event?.code) {
            case 'KeyP':
                eventType = eventTypes.PLACE;
                break;
            case 'KeyR':
                eventType = eventTypes.REPORT;
                break;
            case 'KeyF':
                eventType = eventTypes.FORWARD;
                break;
            case 'KeyB':
                eventType = eventTypes.BACKWARD;
                break;
            case 'KeyC':
                eventType = eventTypes.CLOCKWISE;
                break;
            case 'KeyO':
                eventType = eventTypes.COUNTERCLOCKWISE;
                break;
        }

        if (eventType) {
            document.dispatchEvent(new Event(eventType))
        }
    });
}
