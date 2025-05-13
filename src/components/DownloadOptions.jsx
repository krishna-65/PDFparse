import React from 'react';

const DownloadOptions = ({ processResult }) => {
  if (!processResult || !processResult.output_folder) {
    return null;
  }

  const { output_folder, full_text_path, tables } = processResult;

  // Prepare files for multi-file download
  const prepareFilesForZip = () => {
    const files = [];
    
    // Add full text file if available
    if (full_text_path) {
      files.push(full_text_path);
    }
    
    // Add all table files (both CSV and Excel)
    if (tables && tables.tables) {
      tables.tables.forEach(table => {
        if (table.csv_path) files.push(table.csv_path);
        if (table.excel_path) files.push(table.excel_path);
      });
    }
    
    return files;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Download Options</h2>
      
      <div className="space-y-4">
        {/* Full Text Download */}
        {full_text_path && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Full Text</h3>
            <a
              href={`https://pdfparser-production-10d9.up.railway.app/download/${encodeURIComponent(full_text_path)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Download Full Text
            </a>
          </div>
        )}
        
        {/* Download All as ZIP */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Download All Files</h3>
          <div className="flex flex-wrap gap-3">
            {/* Download output folder as ZIP */}
            <a
              href={`https://pdfparser-production-10d9.up.railway.app/download-output/${encodeURIComponent(output_folder)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download All as ZIP
            </a>
            
            {/* Alternative ZIP download method */}
            <button
              onClick={() => {
                const files = prepareFilesForZip();
                const requestBody = { files };
                
                // Create a form and submit it programmatically
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://pdfparser-production-10d9.up.railway.app/download-zip/';
                form.target = '_blank';
                
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'files';
                input.value = JSON.stringify(files);
                
                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Download Selected Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadOptions;
