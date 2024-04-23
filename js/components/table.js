import '../../style.css'
import '../../css/board.css'
export function setupBoard(element) {
    const board = document.createElement('div');
    board.id = 'board';

    let wall;
    for (let i= 0; i<20; i++) {
        if (i < 5) {
            wall = document.createElement('span');
            wall.classList.add('northWall');
        } else if (i > 4 && i < 10) {
            wall = document.createElement('span');
            wall.classList.add('ovestWall');
        } else if (i > 9 && i < 15) {
            wall = document.createElement('span');
            wall.classList.add('eastWall');
        } else if (i > 14 && i < 20) {
            wall = document.createElement('span');
            wall.classList.add('sudWall');
        }
        board.appendChild(wall);
    }
    element.appendChild(board);

    return board;
}
