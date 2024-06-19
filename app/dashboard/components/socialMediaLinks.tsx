// components/SocialMediaLinks.tsx
import { FaSpotify, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface SocialMediaLinksProps {
  links: Record<string, string>;
  onChange?: (platform: string, link: string) => void;
  editable?: boolean;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ links, onChange, editable = true }) => {
  const [inputs, setInputs] = useState(links);

  useEffect(() => {
    setInputs(links);
  }, [links]);

  const handleInputChange = (platform: string, link: string) => {
    const updatedLinks = { ...inputs, [platform]: link };
    setInputs(updatedLinks);
    if (onChange) {
      onChange(platform, link);
    }
  };

  const renderIcon = (platform: string, Icon: any, colorClass: string) => (
    <div className="flex flex-col items-center space-y-2">
      <a
        href={inputs[platform] || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={inputs[platform] ? `text-amber-200` : `text-gray-800`}
      >
        <Icon size={24} />
      </a>
      {editable && (
        <input
          type="text"
          value={inputs[platform] || ''}
          onChange={(e) => handleInputChange(platform, e.target.value)}
          placeholder={`Enter ${platform} link`}
          className="w-full p-1 text-center bg-gray-900 text-white rounded-sm"
        />
      )}
    </div>
  );

  return (
    <div className="flex space-x-4">
      {renderIcon('spotify', FaSpotify, 'text-green-600')}
      {renderIcon('youtube', FaYoutube, 'text-red-600')}
      {renderIcon('instagram', FaInstagram, 'text-pink-600')}
      {renderIcon('tiktok', FaTiktok, 'text-black')}
    </div>
  );
};

export default SocialMediaLinks;
