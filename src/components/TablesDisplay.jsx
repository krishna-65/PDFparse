import React, { useState } from 'react';

const TablesDisplay = ({ tables }) => {
  const [activeTableId, setActiveTableId] = useState(null);

  if (!tables || !tables.tables || tables.tables.length === 0) {
    return null;
  }

  // Set the first table as active by default if none is selected
  if (activeTableId === null && tables.tables.length > 0) {
    setActiveTableId(tables.tables[0].table_id);
  }

  const activeTable = tables.tables.find(table => table.table_id === activeTableId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Extracted Tables</h2>
      <p className="text-sm text-gray-600 mb-4">
        Total tables found: {tables.total_tables}
      </p>

      {/* Table Navigation */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tables.tables.map((table) => (
          <button
            key={table.table_id}
            onClick={() => setActiveTableId(table.table_id)}
            className={`px-3 py-1 text-sm rounded-md ${
              activeTableId === table.table_id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Table {table.table_id}
          </button>
        ))}
      </div>

      {/* Table Preview */}
      {activeTable && activeTable.preview && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {activeTable.preview[0].map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeTable.preview.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Download Links */}
      {activeTable && (
        <div className="mt-4 flex gap-3">
          <a
            href={`https://pdfparser-production-10d9.up.railway.app/download/${encodeURIComponent(activeTable.csv_path)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Download CSV
          </a>
          <a
            href={`https://pdfparser-production-10d9.up.railway.app/download/${encodeURIComponent(activeTable.excel_path)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Download Excel
          </a>
        </div>
      )}
    </div>
  );
};

export default TablesDisplay;
