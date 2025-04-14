import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutocompleteAddress from './AutocompleteAddress';

function TravelForm() {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [journeyDate, setJourneyDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const navigate = useNavigate();

    const handlePlaceSelected = (place, type) => {
        const address = place.formatted_address;
        if (type === 'from') {
            setFromAddress(address);
        } else if (type === 'to') {
            setToAddress(address);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Navigate to RouteDetails page with query parameters
        navigate('/route-details', {
            state: {
                fromAddress,
                toAddress,
                journeyDate,
                adults,
                children,
            },
        });
    };

    return (
        <div style={{ backgroundColor: '#f7f7f7', padding: '30px 0' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 p-0">
                        <form onSubmit={handleSubmit} className="card p-4 shadow" style={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <h3 className="text-left mb-3" style={{ fontFamily: "'Roboto', sans-serif", color: '#333', fontSize: '20px', fontWeight: '700' }}>Travel Booking</h3>
                            
                            {/* From and To Address Row */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <AutocompleteAddress
                                        label="From Address"
                                        placeholder="Enter starting point"
                                        onPlaceSelected={(place) => handlePlaceSelected(place, 'from')}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <AutocompleteAddress
                                        label="To Address"
                                        placeholder="Enter destination"
                                        onPlaceSelected={(place) => handlePlaceSelected(place, 'to')}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                            
                            {/* Date, Adults, and Children Row */}
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label" style={{ fontSize: '14px' }}>Date of Journey</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={journeyDate}
                                        onChange={(e) => setJourneyDate(e.target.value)}
                                        required
                                        style={{ borderRadius: '8px', padding: '8px', fontSize: '14px' }}
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label" style={{ fontSize: '14px' }}>Number of Adults</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={adults}
                                        onChange={(e) => setAdults(Math.max(1, e.target.value))}
                                        min="1"
                                        style={{ borderRadius: '8px', padding: '8px', fontSize: '14px' }}
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label" style={{ fontSize: '14px' }}>Number of Children</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={children}
                                        onChange={(e) => setChildren(Math.max(0, e.target.value))}
                                        min="0"
                                        style={{ borderRadius: '8px', padding: '8px', fontSize: '14px' }}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                style={{
                                    backgroundColor: '#007bff',
                                    borderColor: '#007bff',
                                    borderRadius: '8px',
                                    padding: '10px 18px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelForm;
