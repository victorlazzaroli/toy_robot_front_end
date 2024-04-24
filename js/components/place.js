import '../../css/place.css'
export class PlaceModal {
    placeComponent;
    closeClbk;

    open(clbk) {
        if (!this.placeComponent) {
            this.closeClbk = clbk;
            this.placeComponent = document.createElement('div');
            this.placeComponent.id = 'placeModal';
            this.placeComponent.innerHTML = `
                <div>
                    <form>
                        <div id="errorContainer" class="validityError"></div>
                        <div>
                            <label for="positionX">Position X</label>
                            <input id="positionX" placeholder="Set the X position" type="number" max="5" min="1" step="1" required/>
                        </div>
                        <div>
                            <label for="positionY">Position Y</label>
                            <input id="positionY" placeholder="Set the Y position" type="number" max="5" min="1" step="1"  required/>
                        </div>
                        <div>
                        
                            <label for="face">Face direction</label>
                            <select id="face" required>
                                <option value="NORTH">North</option>
                                <option value="EAST">East</option>
                                <option value="SOUTH">South</option>
                                <option value="WEST">West</option>
                            </select>
                        </div>
                        <div style="width: 100%; text-align: end">
                            <button id="closeButton" type="button" style="display: inline" >Close</button>
                            <button id="saveButton" type="button" style="margin-left: 1rem; display: inline">Save</button>
                        </div>
                    </form>
                </div>
            `
            document.querySelector('body').appendChild(this.placeComponent);

            this.placeComponent.querySelector('#closeButton').addEventListener('click', this.close.bind(this))
            this.placeComponent.querySelector('#saveButton').addEventListener('click', this.save.bind(this))
            this.placeComponent.querySelector('form').addEventListener('input', () => {
                this.showError();
            })
        }
    }

    save() {
        const form = this.placeComponent.querySelector('form');
        if (!form.checkValidity()) {
            return this.showError()
        }
        const positionX = this.placeComponent.querySelector('#positionX').value;
        const positionY = this.placeComponent.querySelector('#positionY').value;
        const face = this.placeComponent.querySelector('#face').value;

        if (this.closeClbk) {
            this.closeClbk(positionX, positionY, face);
        }
        this.close();
    }

    close() {
        if (this.placeComponent) {
            this.placeComponent.parentNode.removeChild(this.placeComponent);
            this.placeComponent = null;
        }
    }

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
}
