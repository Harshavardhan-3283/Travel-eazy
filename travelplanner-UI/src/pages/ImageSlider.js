import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../pages/images/dalle.webp';
import image2 from '../pages/images/image2.jpeg';
import image3 from '../pages/images/image-3.jpg';

const images = [
    image2,
    image3,
    image1
];

function ImageSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img
                        src={image}
                        alt={`slide-${index}`}
                        style={{
                            width: '100%',
                            height: '320px',
                            objectFit: 'cover',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            display: 'block'
                        }}
                    />
                </div>
            ))}
        </Slider>
    );
}

export default ImageSlider;