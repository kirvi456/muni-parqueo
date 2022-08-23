import { jsPDF } from "jspdf";

export const generarPDF = () => {

    const doc = new jsPDF({
            orientation: 'p', // landscape
            unit: 'mm', // points, pixels won't work properly
            format: [72, 110], // set needed dimensions for any element
            compress: true
    });

    const pdfjs = document.querySelector<HTMLDivElement>('#divImprimir');

    // Convert HTML to PDF in JavaScript
    doc.html(pdfjs || 'Error Interno', {
        html2canvas:{
            width: 300,
            height: 300,
            scale: 0.24
        },
        x: 1,
        y: 1,
        callback: function(doc) {
            // doc.save("output.pdf");
            doc.autoPrint();
            const ventana = window.open(doc.output('bloburl'));
            if( ventana ) {
            }
        },
    });
}