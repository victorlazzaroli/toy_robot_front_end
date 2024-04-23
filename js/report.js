import '../css/report.css'

export class ReportModal {
    static reportComponent;
    open(positionX, positionY, face) {
        if (!ReportModal.reportComponent) {
            ReportModal.reportComponent = document.createElement('div');
            ReportModal.reportComponent.id = 'reportModal';
            ReportModal.reportComponent.innerHTML = `
                <div >
                    <span style="display: block"><strong>Position X:</strong> ${positionX}</span>
                    <span style="display: block"><strong>Position Y:</strong> ${positionY}</span>
                    <span style="display: block"><strong>Direction:</strong> ${face}</span>
                    
                    <button type="button" style="align-self: end">Close</button>
                </div>
            `
            document.querySelector('body').appendChild(ReportModal.reportComponent);

            ReportModal.reportComponent.querySelector('button').addEventListener('click', this.close)
        }
    }

    close() {
        if (ReportModal.reportComponent) {
            ReportModal.reportComponent.parentNode.removeChild(ReportModal.reportComponent);
            ReportModal.reportComponent = null;
        }
    }
}
