import '../../css/place.css'
export class PlaceModal {
    placeComponent;
    closeClbk;

    // Metodo per aprire il modal e impostare la callback di chiusura
    open(clbk) {
        if (!this.placeComponent) {
            this.closeClbk = clbk;
            this.createModal();
            this.attachEventListeners();
        }
    }

    // Metodo per salvare i dati inseriti nel form
    save() {
        const form = this.placeComponent.querySelector('form');
        if (!form.checkValidity()) {
            return this.showError();
        }
        const positionX = this.convertToLocalReference(this.placeComponent.querySelector('#positionX').value, false);
        const positionY = this.convertToLocalReference(this.placeComponent.querySelector('#positionY').value, true);
        const face = this.placeComponent.querySelector('#face').value;

        if (this.closeClbk) {
            this.closeClbk(positionX, positionY, face);
        }
        this.close();
    }

    // Metodo per chiudere il modal
    close() {
        if (this.placeComponent) {
            this.placeComponent.parentNode.removeChild(this.placeComponent);
            this.placeComponent = null;
        }
    }

    // Metodo per gestire gli errori di validazione del form
    showError() {
        const form = this.placeComponent.querySelector('form');
        const positionXInput = form.querySelector('#positionX');
        const positionYInput = form.querySelector('#positionY');
        const errorMessage = form.querySelector('#errorContainer');

        if (form.checkValidity()) {
            errorMessage.className = 'validityError';
            return errorMessage.textContent = '';
        }
        if (positionXInput.validity.rangeOverflow || positionYInput.validity.rangeOverflow ) {
            errorMessage.className = 'validityError active';
            return errorMessage.textContent = 'Max position is 5';
        } else if (positionXInput.validity.valueMissing || positionYInput.validity.valueMissing) {
            errorMessage.className = 'validityError active';
            return errorMessage.textContent = 'All fields are required';
        } else if (positionXInput.validity.rangeUnderflow || positionYInput.validity.rangeUnderflow) {
            errorMessage.className = 'validityError active';
            return errorMessage.textContent = 'Min position is 1';
        }
    }

    // Metodo per convertire la posizione in riferimento locale
    convertToLocalReference(position, isY) {
        if (!Number.isInteger(+position)) {
            return 0;
        }

        return isY ? 100 * (5 - Number.parseInt(position) ) : 100*(Number.parseInt(position) - 1)
    }

    // Metodo per creare il modal
    createModal() {
        this.placeComponent = document.createElement('div');
        this.placeComponent.id = 'placeModal';
        this.placeComponent.innerHTML = `
            <div>
                <form>
                    <div id="errorContainer" class="validityError" role="alert" aria-live="assertive"></div>
                    <div>
                        <label for="positionX">Position X</label>
                        <input id="positionX" placeholder="Set the X position" type="number" max="5" min="1" step="1" required aria-label="X Position"/>
                    </div>
                    <div>
                        <label for="positionY">Position Y</label>
                        <input id="positionY" placeholder="Set the Y position" type="number" max="5" min="1" step="1" required aria-label="Y Position"/>
                    </div>
                    <div>
                        <label for="face">Face direction</label>
                        <select id="face" required aria-label="Face Direction">
                            <option value="NORTH">North</option>
                            <option value="EAST">East</option>
                            <option value="SOUTH">South</option>
                            <option value="WEST">West</option>
                        </select>
                    </div>
                    <div style="width: 100%; text-align: end">
                        <button id="closeButton" type="button" style="display: inline" aria-label="Close">Close</button>
                        <button id="saveButton" type="button" style="margin-left: 1rem; display: inline" aria-label="Save">Save</button>
                    </div>
                </form>
            </div>
        `;
        document.querySelector('body').appendChild(this.placeComponent);
    }

    // Metodo per aggiungere gli eventi al modal
    attachEventListeners() {
        this.placeComponent.querySelector('#closeButton').addEventListener('click', this.close.bind(this));
        this.placeComponent.querySelector('#saveButton').addEventListener('click', this.save.bind(this));
        this.placeComponent.querySelector('form').addEventListener('input', () => {
            this.showError();
        });
    }
}

