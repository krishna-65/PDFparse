import React from 'react'
import { useState } from 'react'
import './App.css'
import PDFUploader from './components/PDFUploader'
import MetadataDisplay from './components/MetadataDisplay'
import TablesDisplay from './components/TablesDisplay'
import DownloadOptions from './components/DownloadOptions'

function App() {
  const [processResult, setProcessResult] = useState(null);

  const handleUploadSuccess = (data) => {
    setProcessResult(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">PDF Parser</h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload a PDF to extract tables and metadata
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <PDFUploader onUploadSuccess={handleUploadSuccess} />
          </div>

          <div className="md:col-span-2">
            {processResult ? (
              <div className="space-y-6">
                <MetadataDisplay metadata={processResult.metadata} />
                <TablesDisplay tables={processResult.tables} />
                <DownloadOptions processResult={processResult} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-64">
                <p className="text-gray-500 text-center">
                  Upload a PDF file to see the extracted data here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
