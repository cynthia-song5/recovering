import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export function BackButton({ label = 'Circles', to }: { label?: string; to?: string }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => (to ? navigate(to) : navigate(-1))} className="back-link">
      <ChevronLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
