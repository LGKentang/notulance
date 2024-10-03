import { useState } from "react";
import { PDFDocument } from "pdf-lib";

const WatermarkTesting = () => {
    const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);

            const imageUrl = '/notulance-wm-b.png';
            const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
            const image = await pdfDoc.embedPng(imageBytes);

            const pages = pdfDoc.getPages();

            pages.forEach((page) => {
                const { width, height } = page.getSize();

                const imgDims = image.scale(0.5); 
                const imgWidth = imgDims.width;
                const imgHeight = imgDims.height;

                const cols = Math.floor(width / imgWidth); 
                const rows = Math.floor(height / imgHeight); 

                const xPadding = (width - cols * imgWidth) / 2;  
                const yPadding = (height - rows * imgHeight) / 2; 

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const x = xPadding + col * imgWidth;
                        const y = height - yPadding - (row + 1) * imgHeight; 

                        page.drawImage(image, {
                            x,
                            y,
                            width: imgWidth,
                            height: imgHeight,
                            opacity: 0.06, 
                        });
                    }
                }
            });

            const pdfWithWatermarkBytes = await pdfDoc.save();
            const blob = new Blob([pdfWithWatermarkBytes], { type: 'application/pdf' });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'watermarked.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            console.error("Please select a valid PDF file.");
        }
    };

    return (
        <>
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        </>
    );
};

export default WatermarkTesting;
