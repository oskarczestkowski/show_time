"use client";
import { User } from "@/types/types";
import React, { useRef, useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

interface AddressComponents {
  street_number?: string;
  route?: string;
  locality?: string;
  administrative_area_level_1?: string;
  postal_code?: string;
  country?: string;
}

const componentTypes = [
  'street_number',
  'route',
  'locality',
  'administrative_area_level_1',
  'postal_code',
  'country'
] as const;

type ComponentType = typeof componentTypes[number];

interface EventFormProps {
  user: User;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ user, onClose }) => {
  const locationInput = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [eventName, setEventName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePlaceChanged = () => {
    const place = searchBoxRef.current?.getPlaces()?.[0];
    if (!place || !place.geometry) {
      alert(`No details available for input className="border border-black": '${place?.name}'`);
      return;
    }

    const addressComponents: AddressComponents = {};
    place.address_components?.forEach((component) => {
      const type = component.types[0] as ComponentType;
      addressComponents[type] = component.long_name;
    });

    const streetAddr = `${addressComponents.street_number || ''} ${addressComponents.route || ''}`.trim();
    console.log('Autocomplete result:', addressComponents);
    console.log('Constructed street address:', streetAddr);

    setStreetAddress(streetAddr);
    setCity(addressComponents.locality || '');
    setState(addressComponents.administrative_area_level_1 || '');
    setPostalCode(addressComponents.postal_code || '');
    setCountry(addressComponents.country || '');
  };

  const formatDateTime = (dateTime: string): string => {
    const dateObj = new Date(dateTime);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const missingFields: string[] = [];

    if (!eventName) missingFields.push('Event Name');
    if (!description) missingFields.push('Description');
    if (!date) missingFields.push('Date');
    if (!streetAddress) missingFields.push('Street Address');
    if (!city) missingFields.push('City');
    if (!state) missingFields.push('State/Province');
    if (!postalCode) missingFields.push('Postal Code');
    if (!country) missingFields.push('Country');

    if (missingFields.length > 0) {
      const errorMessage = `Please fill in all required fields: ${missingFields.join(', ')}`;
      setError(errorMessage);
      console.error(errorMessage);
      return;
    }

    const user_id = user.id;
    if (!user_id) {
      setError('User ID is missing');
      console.error('User ID is missing');
      return;
    }

    const formattedDate = formatDateTime(date);

    try {
      const response = await fetch('/api/placeowner/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pb_auth')}`
        },
        body: JSON.stringify({
          user_id,
          street_address: streetAddress,
          city,
          state,
          postal_code: postalCode,
          country,
          date: formattedDate,
          description,
          event_name: eventName
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to create event');
        console.error('Server response:', data);
        return;
      }

      setStreetAddress('');
      setCity('');
      setState('');
      setPostalCode('');
      setCountry('');
      setDate('');
      setDescription('');
      setEventName('');
      setError(null);

      onClose();

    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col">
        <label>Event Name</label>
        <input className="border border-black" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>Description</label>
        <textarea className="border border-black" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>Date</label>
        <input className="border border-black" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>Street Address</label>
        <StandaloneSearchBox onLoad={ref => (searchBoxRef.current = ref)} onPlacesChanged={handlePlaceChanged}>
          <input className="border border-black" type="text" ref={locationInput} placeholder="Enter your address" required />
        </StandaloneSearchBox>
      </div>
      <div className="flex flex-col">
        <label>City</label>
        <input className="border border-black" type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>State/Province</label>
        <input className="border border-black" type="text" value={state} onChange={(e) => setState(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>Postal Code</label>
        <input className="border border-black" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </div>
      <div className="flex flex-col">
        <label>Country</label>
        <input className="border border-black" type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default EventForm;
