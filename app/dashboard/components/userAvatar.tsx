// components/UserAvatar.tsx
import Image from "next/image";
import { User } from "@/types/types";

const UserAvatar = ({ user }: { user: User }) => (
  <div className="flex flex-col items-center">
    <p className="font-bold text-amber-200">{user.role}</p>
    {user.avatar ? (
      <Image
        src={user.avatar}
        alt="User photo"
        width={400}
        height={400}
        className="h-32 w-32 rounded-sm border-4 border-yellow-600"
      />
    ) : (
      <div className="h-32 w-32 rounded-sm border-4 border-yellow-600 bg-gray-300 flex items-center justify-center">
        No Image
      </div>
    )}
  </div>
);

export default UserAvatar;
