import { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { ethereum } from '../lib/ethereum';

interface FormData {
  studentName: string;
  course: string;
  issueDate: string;
}

interface FormErrors {
  studentName?: string;
  course?: string;
  issueDate?: string;
}

export function useCertificateForm() {
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    course: '',
    issueDate: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Course name is required';
    }
    if (!formData.issueDate) {
      newErrors.issueDate = 'Issue date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Generate a unique hash for the certificate
      const certificateHash = crypto.randomUUID();
      
      // Issue certificate on blockchain
      await ethereum.init();
      const issueDate = new Date(formData.issueDate).getTime() / 1000;
      await ethereum.issueCertificate(
        certificateHash,
        formData.studentName,
        formData.course,
        issueDate
      );

      // Store in Supabase
      const { error } = await supabase
        .from('certificates')
        .insert([
          {
            student_name: formData.studentName,
            course: formData.course,
            issue_date: formData.issueDate,
            hash: certificateHash,
          },
        ]);

      if (error) throw error;

      toast.success('Certificate issued successfully on blockchain!');
      setFormData({ studentName: '', course: '', issueDate: '' });
    } catch (error) {
      toast.error('Failed to issue certificate');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
}