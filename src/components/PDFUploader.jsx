import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const PDFUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setUploadError(null);
    } else {
      setFile(null);
      setUploadError('Please select a valid PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a PDF file first');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://pdfparser-production-10d9.up.railway.app/upload/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data) {
        onUploadSuccess(response.data);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setUploadError(
        error.response?.data?.detail || 
        'Failed to upload PDF. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
      
      <div className="mb-4">
        <label 
          htmlFor="pdf-upload" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select PDF File
        </label>
        <input
          type="file"
          id="pdf-upload"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
        />
      </div>

      {file && (
        <div className="mb-4 text-sm text-gray-600">
          Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}

      {uploadError && (
        <div className="mb-4 text-sm text-red-600">
          {uploadError}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium
                  ${!file || isUploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
      >
        {isUploading ? 'Uploading...' : 'Upload PDF'}
      </button>
    </div>
  );
};

export default PDFUploader;
