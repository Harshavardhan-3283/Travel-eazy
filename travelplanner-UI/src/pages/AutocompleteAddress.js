import React, { useState, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places']; // Load the places library

function AutocompleteAddress({ label, placeholder, onPlaceSelected }) {
    const [value, setValue] = useState('');
    const autocompleteRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC7RhZX-boZwfeW3_nkrtqKdppcz9Pwtzk', // Replace with your API key
        libraries,
    });

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            onPlaceSelected(place); // Pass the selected place to the parent
            setValue(place.formatted_address || '');
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                ref={(ref) => {
                    if (ref && !autocompleteRef.current) {
                        const autocomplete = new window.google.maps.places.Autocomplete(ref, {
                            types: ['address'], // Restrict to address type
                            componentRestrictions: { country: 'in' }, // Restrict to a specific country (optional)
                        });
                        autocompleteRef.current = autocomplete;
                        autocomplete.addListener('place_changed', handlePlaceChanged);
                    }
                }}
            />
        </div>
    );
}

export default AutocompleteAddress;
