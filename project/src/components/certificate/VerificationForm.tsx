import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { VerificationResult } from './VerificationResult';
import { useVerificationForm } from '../../hooks/useVerificationForm';

export function VerificationForm() {
  const { certificateId, verificationStatus, isLoading, handleChange, handleVerify } = useVerificationForm();

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Search className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Verify Certificate</h2>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <Input
          label="Certificate ID"
          value={certificateId}
          onChange={handleChange}
          placeholder="Enter certificate ID"
          required
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Certificate'}
        </Button>
      </form>

      {verificationStatus !== null && (
        <VerificationResult status={verificationStatus} />
      )}
    </div>
  );
}