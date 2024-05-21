import { useState, useEffect } from 'react';
import './OrderImagesSlider.css';

const OrderImagesSlider = () => {
    const images = [
        "https://nurawsbucket.s3.amazonaws.com/Q0t0.gif",
        "https://nurawsbucket.s3.amazonaws.com/PWF.gif",
        "https://nurawsbucket.s3.amazonaws.com/original.webp",
        "https://nurawsbucket.s3.amazonaws.com/image_processing20220604-27427-vg9vk3.gif",

    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="slider-container">
            <button className="slider-button prev" onClick={prevSlide}>&#10094;</button>
            <div className="slider-images">
                {images.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Order Image ${index + 1}`}
                        className={`slider-image ${index === currentIndex ? 'active' : ''}`}
                        style={{ display: index === currentIndex ? 'block' : 'none' }}
                    />
                ))}
            </div>
            <button className="slider-button next" onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

export default OrderImagesSlider;
