import { ReportModal } from '../js/components/report'; // Importa la classe da testare
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {vitest} from "vitest";
describe('ReportModal', () => {
    let reportModal;

    beforeEach(() => {
        // Crea una nuova istanza di ReportModal prima di ogni test
        reportModal = new ReportModal();
    });

    afterEach(() => {
        // Elimina la ReportModal dopo ogni test
        reportModal = null;
    });

    it('open creates modal with correct report information', () => {
        // Chiama il metodo open con dati di report fittizi
        const mockCallback = vitest.fn();
        reportModal.open(200, 300, 'NORTH', mockCallback);

        // Verifica che il modal sia stato creato correttamente con le informazioni del report
        const modalElement = document.getElementById('reportModal');
        expect(modalElement).toBeDefined();
        expect(modalElement.querySelectorAll('span').length).toBe(3);
        expect(modalElement.querySelectorAll('span')[0].textContent).toBe('Position X: 3');
        expect(modalElement.querySelectorAll('span')[1].textContent).toBe('Position Y: 2');
        expect(modalElement.querySelectorAll('span')[2].textContent).toBe('Direction: NORTH');
        reportModal.close();
    });

    it('close removes modal from DOM and calls close callback', () => {
        // Simula l'apertura del modal e imposta un callback di chiusura fittizio
        const mockCallback = vitest.fn();
        reportModal.open(200, 300, 'NORTH', mockCallback);

        // Chiama il metodo close
        reportModal.close();

        // Verifica che il modal sia stato rimosso dal DOM e che il callback di chiusura sia stato chiamato
        const modalElement = document.getElementById('reportModal');
        expect(modalElement).toBeNull();
        expect(mockCallback).toHaveBeenCalled();
    });
});
