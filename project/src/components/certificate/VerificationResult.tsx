import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface VerificationResultProps {
  status: boolean;
}

export function VerificationResult({ status }: VerificationResultProps) {
  return (
    <div className={`mt-6 p-4 rounded-lg ${status ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="flex items-center space-x-3">
        {status ? (
          <>
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-green-800">Certificate is Valid</p>
              <p className="text-sm text-green-600">This certificate has been verified on the blockchain.</p>
            </div>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-red-500" />
            <div>
              <p className="font-medium text-red-800">Invalid Certificate</p>
              <p className="text-sm text-red-600">This certificate could not be verified.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}