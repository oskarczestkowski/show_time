import dynamic from 'next/dynamic'
import { useUser } from '@/app/contexts/UserContext';

const MapElement = dynamic(() => import('./MapElement'), { ssr: true });

export const Map = () => {
  const { user } = useUser();

  return (
    user ? <MapElement userRole={user.role} /> : <p>Loading map...</p>
  );
}
