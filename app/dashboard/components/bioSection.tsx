// components/BioSection.tsx
import { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

interface BioSectionProps {
  bio: string;
  onSave?: (newBio: string) => void;
  editable?: boolean;
}

const BioSection: React.FC<BioSectionProps> = ({ bio, onSave, editable = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(bio);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (onSave) {
      onSave(bioText);
    }
    setIsEditing(false);
  };

  return (
    <div className="bio-section text-white w-full">
      <div className="flex justify-between items-center">
        <h3>Bio</h3>
        {editable && (
          isEditing ? (
            <FaSave className="cursor-pointer" onClick={handleSaveClick} />
          ) : (
            <FaEdit className="cursor-pointer" onClick={handleEditClick} />
          )
        )}
      </div>
      {isEditing ? (
        <textarea
          className="w-full mt-2 p-2 bg-gray-800 text-white"
          value={bioText}
          onChange={(e) => setBioText(e.target.value)}
        />
      ) : (
        <p className="mt-2 break-words">{bio}</p>
      )}
    </div>
  );
};

export default BioSection;
