import React, { useState } from "react";
import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const PhotoUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    const storageRef = ref(storage, `photos/${uuidv4()}`);
    await uploadBytes(storageRef, image);

    const url = await getDownloadURL(storageRef);
    setDownloadURL(url);
    setUploading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload a Photo</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-60 object-cover mb-4 rounded-md"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {downloadURL && (
        <p className="mt-4 text-green-600 text-sm break-all">
          Uploaded: <a href={downloadURL} target="_blank" rel="noreferrer">{downloadURL}</a>
        </p>
      )}
    </div>
  );
};

export default PhotoUpload;
