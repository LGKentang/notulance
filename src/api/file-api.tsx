import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


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

export { uploadPdfToStorage };