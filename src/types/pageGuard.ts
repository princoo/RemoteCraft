export interface PageGuardProps {
  error?: string;
  isValid: boolean;
  notFoundMessage?: string;
  children: React.ReactNode;
};