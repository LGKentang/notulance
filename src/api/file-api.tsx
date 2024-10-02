import { storage } from "@/firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PDFDocument } from "pdf-lib";
import { v4 as uuidv4 } from 'uuid';

async function uploadPdfToStorage(noteId: string, pdf: Blob): Promise<string> {
    try {
        const pdfRef = ref(storage, `notes/${noteId}/content.pdf`);
        await uploadBytes(pdfRef, pdf);
        const downloadURL = await getDownloadURL(pdfRef);
        console.log("PDF uploaded successfully. Download URL:", downloadURL);
        return downloadURL;

    } catch (error) {
        console.error("Error uploading PDF to Firestore Storage:", error);
        throw new Error("Failed to upload PDF");
    }
}

async function uploadWatermarkedPdfToStorage(noteId : string, pdf : Blob) : Promise<string> {
    try { 
        const watermarkedBlob = await addWatermarkToPdf(pdf, '/notulance-wm-b.png')

        const pdfRef = ref(storage, `notes/${noteId}/watermarked-content.pdf`);
        await uploadBytes(pdfRef, watermarkedBlob);
        const downloadURL = await getDownloadURL(pdfRef);
        console.log("PDF uploaded successfully. Download URL:", downloadURL);
        return downloadURL;

    } catch (error) {
        console.error("Error uploading PDF to Firestore Storage:", error);
        throw new Error("Failed to upload PDF");
    }
}

async function uploadPdfToTemporaryStorage(pdf: Blob): Promise<string> {
    try {
        const storage = getStorage();
        const uniqueFilename = `temp/content_${uuidv4()}.pdf`;
        const pdfRef = ref(storage, uniqueFilename);

        await uploadBytes(pdfRef, pdf);
        const downloadURL = await getDownloadURL(pdfRef);
        console.log("PDF uploaded successfully. Download URL:", downloadURL);
        return downloadURL;

    } catch (error) {
        console.error("Error uploading PDF to Firestore Storage:", error);
        throw new Error("Failed to upload PDF");
    }
}

async function fetchBlobFromUrl(downloadUrl: string): Promise<Blob> {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch blob: ${response.statusText}`);
    }
    return await response.blob();
}

async function copyPdf(oldPath : string, newPath  : string) {
    try {
        const oldFileRef = ref(storage, oldPath);

        const downloadUrl = await getDownloadURL(oldFileRef);
        const response = await fetch(downloadUrl);
        const blob = await response.blob();

        const newFileRef = ref(storage, newPath);
        await uploadBytes(newFileRef, blob);

        console.log(`File copied from ${oldPath} to ${newPath}`);
    } catch (error) {
        console.error('Error copying the file:', error);
    }
}

async function uploadThumbnailToStorage(noteId: string, image: Blob): Promise<string> {
    try {
        const pngBlob = await convertImageToPng(image);

        const storage = getStorage();
        const thumbnailRef = ref(storage, `notes/${noteId}/thumbnail.png`);

        await uploadBytes(thumbnailRef, pngBlob);
        
        const downloadURL = await getDownloadURL(thumbnailRef);
        console.log("Thumbnail uploaded successfully. Download URL:", downloadURL);
        return downloadURL;

    } catch (error) {
        console.error("Error uploading thumbnail to Firestore Storage:", error);
        throw new Error("Failed to upload thumbnail");
    }
}

function convertImageToPng(image: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
            img.src = event.target?.result as string;
        };

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Failed to convert image to PNG"));
                    }
                }, 'image/png');
            } else {
                reject(new Error("Failed to get 2D context for canvas"));
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(image);
    });
}

const addWatermarkToPdf = async (pdfBlob: Blob, imageUrl: string) => {
    const pdfBytes = await pdfBlob.arrayBuffer();

    const pdfDoc = await PDFDocument.load(pdfBytes);

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

    return new Blob([pdfWithWatermarkBytes], { type: 'application/pdf' });
};


// const addWatermarkToPdf = async (firebaseUrl: string, imageUrl: string) => {
//     const pdfResponse = await fetch(firebaseUrl);
//     if (!pdfResponse.ok) {
//         throw new Error('Failed to fetch PDF from the provided URL');
//     }

//     const pdfBlob = await pdfResponse.blob();
//     const pdfBytes = await pdfBlob.arrayBuffer();  

//     const pdfDoc = await PDFDocument.load(pdfBytes);

//     const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
//     const image = await pdfDoc.embedPng(imageBytes);

//     const pages = pdfDoc.getPages();

//     pages.forEach((page) => {
//         const { width, height } = page.getSize();

//         const imgDims = image.scale(0.5); 
//         const imgWidth = imgDims.width;
//         const imgHeight = imgDims.height;

//         const cols = Math.floor(width / imgWidth); 
//         const rows = Math.floor(height / imgHeight); 

//         const xPadding = (width - cols * imgWidth) / 2;  
//         const yPadding = (height - rows * imgHeight) / 2; 

//         for (let row = 0; row < rows; row++) {
//             for (let col = 0; col < cols; col++) {
//                 const x = xPadding + col * imgWidth;
//                 const y = height - yPadding - (row + 1) * imgHeight; 

//                 page.drawImage(image, {
//                     x,
//                     y,
//                     width: imgWidth,
//                     height: imgHeight,
//                     opacity: 0.06, 
//                 });
//             }
//         }
//     });

//     const pdfWithWatermarkBytes = await pdfDoc.save();
//     return new Blob([pdfWithWatermarkBytes], { type: 'application/pdf' });
// };





export { uploadPdfToStorage, uploadThumbnailToStorage, copyPdf , fetchBlobFromUrl,  uploadPdfToTemporaryStorage, addWatermarkToPdf , uploadWatermarkedPdfToStorage };