import {setupBoard} from "./table.js";
import {Robot} from "./robot.js";
import {ActionManager} from "./actionManager.js";
import {setupControlBench} from "./controlBench.js";

const app = document.querySelector('#app');
const actionManager = new ActionManager();
actionManager.init();
const board = setupBoard(app);
const robot = new Robot( board, 0, 0, 'NORTH');
setupControlBench(app);

