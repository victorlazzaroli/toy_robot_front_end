import {setupBoard} from "./table.js";
import {Robot} from "./robot.js";

const app = document.querySelector('#app');
const board = setupBoard(app);
const robot = new Robot( board, 50, 50, 'NORTH');


