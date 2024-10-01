import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Note } from "@/interfaces/general/note";
import { createNote } from "@/api/note-api";
import { uploadPdfToStorage } from "@/api/file-api"; 
import { uploadNotes } from "@/handlers/note-handler";
import { startReviewNote } from "@/handlers/review-handler";
import { getCurrentUserId } from "@/api/user-api";

const UploadNoteTest = () => {
  const [pdf, setPdf] = useState<Blob | null>(null); 
    function savePdf(event: React.ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0];
      if (file && file.type === "application/pdf") {
        setPdf(file);
      } else {
        console.error("Please select a valid PDF file.");
      }
    }

  async function uploadNoteWithPdf() {
    if (!pdf) {
      console.error("No PDF selected");
      return;
    }

    const note: Note = {
      title: "Introduction to Laravel Security",
      description: "A comprehensive guide to deep learning concepts and techniques.",
      writerId: "user-98765",
      price: 29.99,
      subject: "Artificial Intelligence",
      releaseDate: Timestamp.fromDate(new Date("2024-09-26T11:06:39Z")),
      university: "Harvard University",
      grade: 4,
      fileId: "file-abcde12345",
      score: 5,
      bundleId: null,
      thumbnailUrl: "https://example.com/thumbnail.jpg",
      totalPages: 100,
      ranking: 1,
    };

    try {
      const id = await getCurrentUserId();
      const uploadedNoteId = await startReviewNote(id, note, pdf);
      console.log("Note and PDF uploaded successfully");
    } catch (error) {
      console.error("Error uploading note or PDF:", error);
    }
  }


  return (
    <>
      <input type="file" accept="application/pdf" onChange={savePdf} />
      <br /><br />
      <button onClick={uploadNoteWithPdf} className="text-white">
        Upload Note with PDF
      </button>

    </>
  );
};

export default UploadNoteTest;
