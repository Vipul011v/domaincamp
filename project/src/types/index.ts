export interface Certificate {
  id: string;
  studentName: string;
  institution: string;
  course: string;
  issueDate: string;
  certificateHash: string;
  isVerified: boolean;
}

export interface Institution {
  id: string;
  name: string;
  address: string;
}