// Importa la classe ActionManager e l'oggetto eventTypes
import { ActionManager, eventTypes } from '../js/services/actionManager.js';
import { describe, it, expect } from 'vitest';
import {vitest} from "vitest";
describe('ActionManager', () => {

    // Test per il costruttore e l'istanza singleton
    it('constructor returns singleton instance', () => {
        const instance1 = new ActionManager();
        const instance2 = new ActionManager();

        // Le due istanze devono essere lo stesso oggetto
        expect(instance1).toBe(instance2);
    });

    // Test per il metodo init
    it('init registers event listeners', () => {
        const actionManager = new ActionManager();
        actionManager.init();

        // Verifica che gli event listeners siano stati registrati per tutti i tipi di evento
        for (const eventType of Object.values(eventTypes)) {
            const eventListeners = actionManager.listeners.get(eventType);
            expect(eventListeners).toBeDefined();
            expect(eventListeners.length).eq(0);
        }
    });

    // Test per il metodo register
    it('register registers callback for event', () => {
        const actionManager = new ActionManager();
        const mockCallback = vitest.fn;

        // Registra un callback per un tipo di evento specifico
        actionManager.register(eventTypes.PLACE, mockCallback);

        // Verifica che il callback sia stato registrato correttamente
        const eventListeners = actionManager.listeners.get(eventTypes.PLACE);
        expect(eventListeners).toContain(mockCallback);
    });

    // Test per il metodo routeEvent
    it('routeEvent calls registered callback for event', () => {
        const actionManager = new ActionManager();
        actionManager.init();
        const mockCallback = vitest.fn();
        const mockCallback2 = vitest.fn();
        actionManager.register(eventTypes.REPORT, mockCallback.bind(this));
        actionManager.register(eventTypes.REPORT, mockCallback2);

        // Simula un evento di tipo 'place'
        actionManager.routeEvent({ type: eventTypes.REPORT });

        // Verifica che il callback sia stato chiamato con il tipo di evento corretto
        expect(mockCallback).toHaveBeenCalled();
        expect(mockCallback2).toHaveBeenCalled();
    });

    // Test per il metodo routeEvent quando non ci sono callback registrati per l'evento
    it('routeEvent does nothing if no callback registered for event', () => {
        const actionManager = new ActionManager();
        actionManager.init();
        const mockCallback = vitest.fn();
        actionManager.register(eventTypes.PLACE, mockCallback);

        // Simula un evento non registrato
        actionManager.routeEvent({ type: 'unregisteredEvent' });

        // Verifica che il callback non sia stato chiamato
        expect(mockCallback).not.toHaveBeenCalled();
    });
});
