import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function SessionRedirect() {
  const { sessionId } = useParams();

  useEffect(() => {
    if (sessionId) {
      window.location.href = `https://tickets.startupmission.in/iedc-summit-2025/sessions?session=${sessionId}`;
    }
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-gilroy-light">Redirecting to session...</p>
      </div>
    </div>
  );
}
