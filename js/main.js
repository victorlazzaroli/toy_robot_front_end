import {setupBoard} from "./table.js";
import {Robot} from "./robot.js";
import {ActionManager, eventTypes} from "./actionManager.js";
import {setupControlBench} from "./controlBench.js";

const app = document.querySelector('#app');
const actionManager = new ActionManager();
actionManager.init();
const board = setupBoard(app);
const robot = new Robot( board, 0, 400, 'NORTH');
const controlBench = setupControlBench(app);
