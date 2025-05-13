import React from 'react';

const MetadataDisplay = ({ metadata }) => {
  if (!metadata) return null;

  const { document_info, security_info, forensic_indicators, risk_assessment } = metadata;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Document Metadata</h2>
      
      {/* Document Info */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Document Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {document_info && Object.entries(document_info).map(([key, value]) => (
            <div key={key} className="border-b border-gray-200 pb-2">
              <span className="text-sm font-medium text-gray-600 capitalize">
                {key.replace(/_/g, ' ')}:
              </span>
              <span className="ml-2 text-sm text-gray-800">
                {value || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Security Info */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Security Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {security_info && Object.entries(security_info).map(([key, value]) => (
            <div key={key} className="border-b border-gray-200 pb-2">
              <span className="text-sm font-medium text-gray-600 capitalize">
                {key.replace(/_/g, ' ')}:
              </span>
              <span className="ml-2 text-sm text-gray-800">
                {typeof value === 'boolean' 
                  ? value ? 'Yes' : 'No'
                  : value || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Forensic Indicators */}
      {forensic_indicators && forensic_indicators.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Forensic Indicators</h3>
          <ul className="list-disc pl-5 space-y-1">
            {forensic_indicators.map((indicator, index) => (
              <li key={index} className="text-sm text-gray-800">{indicator}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Risk Assessment */}
      {risk_assessment && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Risk Assessment</h3>
          
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-600">Risk Level:</span>
            <span className={`ml-2 text-sm font-medium px-2 py-1 rounded-full ${
              risk_assessment.risk_level === 'Low' 
                ? 'bg-green-100 text-green-800' 
                : risk_assessment.risk_level === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {risk_assessment.risk_level}
            </span>
          </div>
          
          {risk_assessment.risk_indicators && risk_assessment.risk_indicators.length > 0 && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-600">Risk Indicators:</span>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {risk_assessment.risk_indicators.map((indicator, index) => (
                  <li key={index} className="text-sm text-gray-800">{indicator}</li>
                ))}
              </ul>
            </div>
          )}
          
          {risk_assessment.recommendation && (
            <div>
              <span className="text-sm font-medium text-gray-600">Recommendation:</span>
              <p className="text-sm text-gray-800 mt-1">{risk_assessment.recommendation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MetadataDisplay;
