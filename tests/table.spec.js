import { setupBoard } from '../js/components/table'; // Importa la funzione da testare
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {vitest} from "vitest";
describe('setupBoard', () => {
    let boardElement;

    beforeEach(() => {
        // Crea un nuovo elemento HTML prima di ogni test
        boardElement = document.createElement('div');
    });

    it('setupBoard appends board element to parent element', () => {
        // Chiama la funzione setupBoard
        setupBoard(boardElement);

        // Verifica che l'elemento del tabellone sia stato aggiunto correttamente all'elemento genitore
        expect(boardElement.children.length).toBe(1);
        expect(boardElement.children[0].id).toBe('board');
    });
});
