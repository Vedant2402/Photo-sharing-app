// src/pages/Upload.jsx
import React from 'react';
import PhotoUpload from '../components/PhotoUpload';

const Upload = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📤 Upload Photo</h1>
      <PhotoUpload />
    </div>
  );
};

export default Upload;
