import { setupControlBench } from '../js/components/controlBench'; // Importa la funzione da testare
import { eventTypes } from '../js/services/actionManager'; // Importa l'oggetto eventTypes
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {vitest} from "vitest";
describe('setupControlBench', () => {
    let element;
    let bench;

    beforeEach(() => {
        // Crea un nuovo elemento HTML e lo appendi al documento prima di ogni test
        element = document.createElement('div');
        document.body.appendChild(element);

        // Chiama la funzione setupControlBench e ottieni il riferimento al pannello di controllo
        bench = setupControlBench(element);
    });

    afterEach(() => {
        // Rimuovi l'elemento HTML dal documento dopo ogni test
        document.body.removeChild(element);
    });

    it('setupControlBench creates control panel with buttons', () => {
        // Verifica che il pannello di controllo sia stato creato correttamente con i pulsanti
        expect(bench).toBeDefined();
        expect(bench.id).toBe('controlBench');
        expect(bench.querySelectorAll('button').length).toBe(Object.keys(eventTypes).length);
    });

});

describe('attachEventsToKeyboard', () => {
    it('attachEventsToKeyboard maps keyboard events to action events', () => {
        // Simula un evento di pressione del tasto sulla tastiera per ogni evento supportato
        const mockDispatchEvent = vitest.spyOn(document, 'dispatchEvent');

        // Simula la pressione dei tasti
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyP' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyR' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyB' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyC' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyO' }));

        // Verifica che ogni evento sia stato mappato correttamente e sia stato dispatcchato
        expect(mockDispatchEvent).toHaveBeenCalledTimes(Object.keys(eventTypes).length * 2);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new Event(eventTypes.PLACE));
        expect(mockDispatchEvent).toHaveBeenCalledWith(new Event(eventTypes.REPORT));
        expect(mockDispatchEvent).toHaveBeenCalledWith(new Event(eventTypes.FORWARD));
        expect(mockDispatchEvent).toHaveBeenCalledWith(new Event(eventTypes.BACKWARD));
        expect(mockDispatchEvent).toHaveBeenCalledWith(new Event(eventTypes.CLOCKWISE));
        expect(mockDispatchEvent).toHaveBeenCalledWith(new Event(eventTypes.COUNTERCLOCKWISE));
    });
});
