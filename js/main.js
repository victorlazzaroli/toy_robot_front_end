import {setupBoard} from "./components/table.js";
import {Robot} from "./components/robot.js";
import {ActionManager} from "./services/actionManager.js";
import {setupControlBench} from "./components/controlBench.js";

const app = document.querySelector('#app');
const actionManager = new ActionManager();
actionManager.init();
const board = setupBoard(app);
const robot = new Robot( board, 0, 400, 'NORTH');
setupControlBench(app);
robot.placeModal(true)
