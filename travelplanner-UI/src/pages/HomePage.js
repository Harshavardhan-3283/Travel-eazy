import React from 'react';
import ImageSlider from './ImageSlider';
import TravelForm from './TravelForm';

function HomePage() {
    return (
        <div>
            <ImageSlider />
            <div className="container mt-5 p-0">
                <TravelForm />
            </div>
        </div>
    );
}

export default HomePage;
