import '../../css/report.css'

// Classe che mostra la modale per mostrare la posizione del robot
export class ReportModal {
    reportComponent;
    closeClbk;

    open(positionX, positionY, face, clbk) {
        if (!this.reportComponent) {
            this.closeClbk = clbk;
            this.reportComponent = document.createElement('div');
            this.reportComponent.id = 'reportModal';
            this.reportComponent.innerHTML = `
                <div >
                    <div id="description">
                        <h2>
                            Toy Robot Report
                        </h2>
                    </div>
                    <span style="display: block"><strong>Position X:</strong> ${positionX / 100 + 1}</span>
                    <span style="display: block"><strong>Position Y:</strong> ${(400 - positionY) / 100 + 1}</span>
                    <span style="display: block"><strong>Direction:</strong> ${face}</span>
                    
                    <button type="button" style="align-self: end">Close</button>
                </div>
            `
            document.querySelector('body').appendChild(this.reportComponent);

            this.reportComponent.querySelector('button').addEventListener('click', this.close.bind(this))
        }
    }

    close() {
        if (this.reportComponent) {
            this.reportComponent.parentNode.removeChild(this.reportComponent);
            this.reportComponent = null;
        }

        if (this.closeClbk) {
            this.closeClbk();
        }
    }
}
