import React, { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';

export function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would check the blockchain
    setVerificationStatus(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Verify Certificate</h2>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Certificate ID</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter certificate ID"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Verify Certificate
        </button>
      </form>

      {verificationStatus !== null && (
        <div className={`mt-4 p-4 rounded-md ${verificationStatus ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center space-x-2">
            {verificationStatus ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-700">Certificate is valid</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700">Certificate is invalid</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}