import React from 'react';
import { FileCheck } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useCertificateForm } from '../../hooks/useCertificateForm';

export function CertificateForm() {
  const { formData, errors, handleChange, handleSubmit, isLoading } = useCertificateForm();

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <FileCheck className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Issue New Certificate</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Student Name"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          error={errors.studentName}
          required
        />
        
        <Input
          label="Course Name"
          name="course"
          value={formData.course}
          onChange={handleChange}
          error={errors.course}
          required
        />
        
        <Input
          label="Issue Date"
          type="date"
          name="issueDate"
          value={formData.issueDate}
          onChange={handleChange}
          error={errors.issueDate}
          required
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Issuing...' : 'Issue Certificate'}
        </Button>
      </form>
    </div>
  );
}