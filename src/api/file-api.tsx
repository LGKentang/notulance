import { storage } from "@/firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

async function uploadPdfToStorage(noteId: string, pdf: Blob): Promise<string> {
    try {
        const storage = getStorage();
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






export { uploadPdfToStorage, uploadThumbnailToStorage, copyPdf , fetchBlobFromUrl,  uploadPdfToTemporaryStorage};