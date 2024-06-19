import { useRouter } from 'next/navigation';
import db from '@/app/db'; // Import your PocketBase instance

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {


    db.Logout()
    

    // Redirect the user to the login page
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">
      Log Out
    </button>
  );
};

export default LogoutButton;
