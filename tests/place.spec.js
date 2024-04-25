import { PlaceModal } from '../js/components/place'; // Importa la classe da testare
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {vitest} from "vitest";

describe('PlaceModal', () => {
    let placeModal;

    beforeEach(() => {
        // Crea una nuova istanza di PlaceModal prima di ogni test
        placeModal = new PlaceModal();
    });

    afterEach(() => {
        placeModal.close();
        // Elimina la PlaceModal dopo ogni test
        placeModal = null;
    });

    it('open creates modal with form elements', () => {
        // Chiama il metodo open con una callback fittizia
        placeModal.open(false, () => {});

        // Verifica che il modal sia stato creato correttamente con i form elements
        const modalElement = document.getElementById('placeModal');
        expect(modalElement).toBeDefined();
        expect(modalElement.querySelectorAll('form').length).toBe(1);
        expect(modalElement.querySelectorAll('input').length).toBe(2);
        expect(modalElement.querySelectorAll('select').length).toBe(1);
    });

    it('save calls close callback with correct arguments', () => {
        const mockCloseCallback = vitest.fn();
        // Simula la creazione del modal
        placeModal.open(false, mockCloseCallback);

        // Simula l'inserimento di dati nel form
        const positionXInput = document.getElementById('positionX');
        const positionYInput = document.getElementById('positionY');
        const faceSelect = document.getElementById('face');
        positionXInput.value = '3';
        positionYInput.value = '4';
        faceSelect.value = 'NORTH';

        // Chiama il metodo save
        placeModal.save();


        // Verifica che il metodo close sia stato chiamato con gli argomenti corretti
        expect(mockCloseCallback).toHaveBeenCalled(200, 300, 'NORTH');
    });

    it('close closes modal and calls close callback', () => {
        const mockCloseCallback = vitest.fn();
        // Simula la creazione del modal
        placeModal.open(true, mockCloseCallback);

        // Simula la chiamata alla close
        placeModal.close();

        // Verifica che il modal sia stato chiuso e che il callback di chiusura sia stato chiamato
        const modalElement = document.getElementById('placeModal');
        expect(modalElement).toBeNull();
        expect(mockCloseCallback).toHaveBeenCalled();
    });

});


describe('PlaceModal form validation', () => {
    let placeModal;

    beforeEach(() => {
        // Crea una nuova istanza di PlaceModal prima di ogni test
        placeModal = new PlaceModal();
        // Crea il modal
        placeModal.createModal(false);
    });

    afterEach(() => {
        // Elimina la PlaceModal dopo ogni test
        placeModal = null;
        // Rimuovi il modal dal DOM dopo ogni test
        const modalElement = document.getElementById('placeModal');
        modalElement?.parentNode?.removeChild(modalElement);
    });

    it('showError displays error message for missing fields', () => {
        // Simula un tentativo di salvataggio senza compilare tutti i campi
        placeModal.save();

        // Verifica che venga visualizzato un messaggio di errore per i campi mancanti
        const errorMessage = document.querySelector('#errorContainer');
        expect(errorMessage.textContent).toBe('All fields are required');
    });

    it('showError displays error message for out-of-range values', () => {
        // Simula un tentativo di salvataggio con valori fuori range
        const positionXInput = document.getElementById('positionX');
        const positionYInput = document.getElementById('positionY');
        positionXInput.value = '6';
        positionYInput.value = '0';
        placeModal.save();

        // Verifica che venga visualizzato un messaggio di errore per i valori fuori range
        const errorMessage = document.querySelector('#errorContainer');
        expect(errorMessage.textContent).toBe('Max position is 5');
    });

    it('showError displays no error message for valid input', () => {
        // Simula un tentativo di salvataggio con input valido
        const positionXInput = document.getElementById('positionX');
        const positionYInput = document.getElementById('positionY');
        positionXInput.value = '3';
        positionYInput.value = '4';
        // Verifica che non venga visualizzato alcun messaggio di errore per input valido
        const errorMessage = document.querySelector('#errorContainer');
        expect(errorMessage.textContent).toBe('');

    });
});
