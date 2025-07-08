import React, { useState } from "react";

const PhotoUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageURL(data.secure_url);
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

      {imageURL && (
        <p className="mt-4 text-green-600 text-sm break-all">
          Uploaded: <a href={imageURL} target="_blank" rel="noreferrer">{imageURL}</a>
        </p>
      )}
    </div>
  );
};

export default PhotoUpload;
