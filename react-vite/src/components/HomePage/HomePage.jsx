// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import "./HomePage.css";

export default function FeaturedPage() {
    // const dispatch = useDispatch();
    // const [randomImages, setRandomImages] = useState([]);


    const bannerImageUrl = "https://nurawsbucket.s3.amazonaws.com/image_processing20210901-15070-19y5146.gif";
    // const smallerImageUrls = [
    //     "https://example.com/image1.jpg",
    //     "https://example.com/image2.jpg",
    //     "https://example.com/image3.jpg",
    //     "https://example.com/image4.jpg",
    //     "https://example.com/image5.jpg",
    //     "https://example.com/image6.jpg",
    // ];

    // useEffect(() => {
    //     // Fetch data or simulate fetching image URLs
    //     setRandomImages(smallerImageUrls);
    // }, []);

    return (
        <div className="featured-page-container">
            <div className="banner-image-container">
                <img src={bannerImageUrl} alt="Banner" className="banner-image" />
            </div>
            {/* <div className="smaller-images-container">
                {randomImages.map((url, index) => (
                    <div className="smaller-image-card" key={index}>
                        <img src={url} alt={`Random Image ${index + 1}`} className="smaller-image" />
                    </div>
                ))}
            </div>
            <div className='featured-page-links'>
                <button onClick={() => navigate('/more-info')} className='more-info-button'>Learn More</button>
            </div> */}
        </div>
    );
}
