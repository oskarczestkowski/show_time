import { MinorLogo } from "../../../components/Logo";
import { User } from "@/types/types";
import LogoutButton from "./Logout";

interface NavigationProps {
  user: User;
  onOpenModal?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onOpenModal }) => {
  return (
    <nav className="px-2 w-full bg-gray-800 items-center m-auto flex justify-between border-b top-0 backdrop-blur-md opacity-100 fixed z-50">
      <div className="z-50">
        <MinorLogo />
      </div>
      <div className="p-3 text-sm">
        {user.role === 'organizer' && onOpenModal && (
          <button
            className="bg-yellow-600 text-white py-2 px-4 rounded"
            onClick={onOpenModal}
          >
            Add Event
          </button>
        )}
        <div>
          <LogoutButton/>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
