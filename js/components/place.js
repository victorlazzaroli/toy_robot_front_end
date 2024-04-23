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
                        <div>
                            <label for="positionX">Position X</label>
                            <input id="positionX" placeholder="Set the X position" type="number" max="5" min="1" step="1" required/>
                        </div>
                        <div>
                            <label for="positionY">Position X</label>
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
                    </form>
                    
                    <button type="button" style="align-self: end">Close</button>
                </div>
            `
            document.querySelector('body').appendChild(this.placeComponent);

            this.placeComponent.querySelector('button').addEventListener('click', this.close.bind(this))
        }
    }

    close() {
        if (!this.placeComponent.querySelector('form').valid) {
            console.log('Error');
        }
        const positionX = this.placeComponent.querySelector('#positionX').value;
        const positionY = this.placeComponent.querySelector('#positionY').value;
        const face = this.placeComponent.querySelector('#face').value;
        if (this.placeComponent) {
            this.placeComponent.parentNode.removeChild(this.placeComponent);
            this.placeComponent = null;
        }

        if (this.closeClbk) {
            this.closeClbk(positionX, positionY, face);
        }
    }
}
