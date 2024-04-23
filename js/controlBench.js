import '../css/controlBench.css'
export function setupControlBench(element) {
    const bench = document.createElement('div');
    const moveDisabled = true;
    bench.id = 'controlBench';
    bench.innerHTML = `
        <button type="button" aria-label="Set position">
            [P]lace
        </button>
        
        <button type="button" aria-label="Move Forward" ${moveDisabled && 'disabled'}>
            [F]orward
        </button>
        <button type="button" aria-label="Move Backward" ${moveDisabled && 'disabled'}>
            [B]ackward
        </button>
        <button type="button" aria-label="Get position" ${moveDisabled && 'disabled'}>
            [R]eport
        </button>
        
        <button type="button" aria-label="Rotate Clockwise" ${moveDisabled && 'disabled'}>
            [C]lockwise
        </button>
        <button type="button" aria-label="Rotate Counterclockwise" ${moveDisabled && 'disabled'}>
            C[o]unterclockwise
        </button>
    `;

    element.appendChild(bench);

    return bench;
}
