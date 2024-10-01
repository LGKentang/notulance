import { Timestamp } from "firebase/firestore";
import { Note } from "@/interfaces/general/note";
import { uploadPdfToStorage } from "@/api/file-api";
import { createNote, updateNoteById } from "@/api/note-api";

interface UploadNoteResult {
    success: boolean;
    message: string;
    uploadedNoteId?: string;
}

async function uploadNotes(note: Note, pdf: Blob): Promise<UploadNoteResult> {
    try {
        validateNoteOrThrow(note);
        validatePdfOrThrow(pdf);

        const uploadedNoteId = await createNote(note);

        const pdfUrl = await uploadPdfToStorage(uploadedNoteId, pdf);

        await updateNoteById(uploadedNoteId, { fileId : pdfUrl });

        return { success: true, message: "Note uploaded successfully", uploadedNoteId };
        
    } catch (error: any) {
        console.error("Error uploading note:", error.message);
        return { success: false, message: error.message || "Failed to upload note" };
    }
}

function validateNoteOrThrow(note: Note) {
    if (!note.title || note.title.trim().length === 0) {
        throw new Error("Title is required");
    }
    if (!note.description || note.description.trim().length === 0) {
        throw new Error("Description is required");
    }
    if (note.price < 0) {
        throw new Error("Price must be a positive number");
    }
    if (!note.subject) {
        throw new Error("Subject is required");
    }
    if (!note.writerId) {
        throw new Error("Writer ID is required");
    }
    if (!note.fileId) {
        throw new Error("File ID is required");
    }
}

function validatePdfOrThrow(pdf: Blob) {
    const validTypes = ["application/pdf"];
    if (!validTypes.includes(pdf.type)) {
        throw new Error("File must be a PDF");
    }
}


export { uploadNotes }