import { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { ethereum } from '../lib/ethereum';

export function useVerificationForm() {
  const [certificateId, setCertificateId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCertificateId(e.target.value);
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Initialize Ethereum connection
      await ethereum.init();
      
      // Verify on blockchain
      const isValid = await ethereum.verifyCertificate(certificateId);
      
      // Cross-reference with Supabase
      const { data, error } = await supabase
        .from('certificates')
        .select()
        .eq('hash', certificateId)
        .single();

      if (error) throw error;

      // Certificate is valid only if it exists in both blockchain and database
      setVerificationStatus(isValid && !!data);
      
      if (!isValid || !data) {
        toast.error('Certificate not found or invalid');
      } else {
        toast.success('Certificate verified successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to verify certificate');
      setVerificationStatus(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    certificateId,
    verificationStatus,
    isLoading,
    handleChange,
    handleVerify,
  };
}