import { Robot } from '../js/components/robot'; // Importa la classe da testare
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {vitest} from "vitest";
// Mock delle dipendenze esterne
vitest.mock('../js/services/actionManager', () => ({
    ActionManager: vitest.fn(() => ({
        register: vitest.fn(),
    })),
    eventTypes: {
        PLACE: 'place',
        REPORT: 'report',
        FORWARD: 'forward',
        BACKWARD: 'backward',
        CLOCKWISE: 'clockwise',
        COUNTERCLOCKWISE: 'counterclockwise'
    }
}));
vitest.mock('../js/components/placeModal', () => ({
    PlaceModal: vitest.fn(() => ({
        open: vitest.fn(),
    })),
}));
vitest.mock('../js/components/reportModal', () => ({
    ReportModal: vitest.fn(() => ({
        open: vitest.fn(),
    })),
}));

describe('Robot', () => {
    let container, robot;

    beforeEach(() => {
        // Crea un nuovo elemento HTML prima di ogni test
        container = document.createElement('div');
        robot = new Robot(container, 0, 0, 'NORTH');
    });

    afterEach(() => {
        // Elimina la robot dopo ogni test
        container.innerHTML = '';
        robot = null;
    });

    it('constructor initializes robot properties and subscribes to action manager events', () => {
        // Verifica che le proprietà del robot siano state inizializzate correttamente
        expect(robot.container).toBe(container);
        expect(robot.positionX).toBe(0);
        expect(robot.positionY).toBe(0);
        expect(robot.face).toBe('NORTH');
        expect(robot.freezeRobot).toBe(false);
        expect(robot.placed).toBe(false);

        // Verifica che il metodo eventSubscription abbia registrato le callback corrette sull'action manager
        expect(robot.actionManager.register).toHaveBeenCalledTimes(6);
    });

    it('robot position cannot be changed if place action is not executed first', () => {

        // Chiama il metodo move con una direzione
        robot.move('forward');

        // Verifica che la posizione del robot sia rimasta uguale
        expect(robot.positionX).toBe(0);
        expect(robot.positionY).toBe(0);

        robot.move('backward');
        // Verifica che la posizione del robot sia rimasta uguale
        expect(robot.positionX).toBe(0);
        expect(robot.positionY).toBe(0);

        robot.rotate('clockwise');
        // Verifica che la direzione del robot sia rimasta uguale
        expect(robot.face).toBe('NORTH');

        robot.rotate('counterclockwise');
        // Verifica che la direzione del robot sia rimasta uguale
        expect(robot.face).toBe('NORTH');
    });

    it('place updates robot position and sets placed flag', () => {
        // Chiama il metodo place con nuove coordinate e direzione
        robot.place(100, 200, 'EAST');

        // Verifica che la posizione e la direzione del robot siano state aggiornate correttamente
        expect(robot.positionX).toBe(100);
        expect(robot.positionY).toBe(200);
        expect(robot.face).toBe('EAST');
        expect(robot.placed).toBe(true);
    });

    it('move updates robot position based on direction', () => {
        // Imposta la posizione iniziale
        robot.place(200, 200, 'SOUTH');

        // Chiama il metodo move con una direzione
        robot.move('forward');

        // Verifica che la posizione del robot sia stata aggiornata correttamente
        expect(robot.positionX).toBe(200);
        expect(robot.positionY).toBe(300);
    });

    it('rotate updates robot face based on rotation', () => {
        // Imposta la direzione iniziale
        robot.place(200, 200, 'NORTH');

        // Chiama il metodo rotate con una rotazione
        robot.rotate('clockwise');

        // Verifica che la direzione del robot sia stata aggiornata correttamente
        expect(robot.face).toBe('EAST');
    });

    it('robot cannot exceed constraint limits', () => {
        // Imposta il robot vicino al limite destro
        robot.place(400, 200, 'EAST');

        // Tenta di spostare il robot oltre il limite destro
        robot.move('forward');

        // Verifica che la posizione del robot non sia cambiata
        expect(robot.positionX).toBe(400);
        expect(robot.positionY).toBe(200);

        // Imposta il robot vicino al limite sinistro
        robot.positionX = 0;
        robot.positionY = 200;
        robot.face = 'WEST';

        // Tenta di spostare il robot oltre il limite sinistro
        robot.move('forward');

        // Verifica che la posizione del robot non sia cambiata
        expect(robot.positionX).toBe(0);
        expect(robot.positionY).toBe(200);

        // Imposta il robot vicino al limite superiore
        robot.positionX = 200;
        robot.positionY = 0;
        robot.face = 'NORTH';

        // Tenta di spostare il robot oltre il limite superiore
        robot.move('forward');

        // Verifica che la posizione del robot non sia cambiata
        expect(robot.positionX).toBe(200);
        expect(robot.positionY).toBe(0);

        // Imposta il robot vicino al limite inferiore
        robot.positionX = 200;
        robot.positionY = 400;
        robot.face = 'SOUTH';

        // Tenta di spostare il robot oltre il limite inferiore
        robot.move('forward');

        // Verifica che la posizione del robot non sia cambiata
        expect(robot.positionX).toBe(200);
        expect(robot.positionY).toBe(400);
    });
});
