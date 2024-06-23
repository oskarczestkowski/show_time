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
    <button onClick={handleLogout} className="btn">
      Log Out
    </button>
  );
};

export default LogoutButton;
