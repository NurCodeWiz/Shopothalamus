import { useEffect, useState } from 'react';
import "./HomePage.css";

export default function FeaturedPage() {
    const smallerImageUrls = [
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+9.01.44+AM.png",
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+9.00.53+AM.png",
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+8.58.41+AM.png",
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+8.59.35+AM.png",
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+8.58.16+AM.png",
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+8.10.20+PM.png",
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+8.10.08+PM.png",
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+8.10.02+PM.png",
        "https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-01+at+8.09.48+PM.png"
    ];

    // Helper function to generate four unique indices
    const generateUniqueIndexes = (size, limit) => {
        const indices = new Set();
        while (indices.size < size) {
            indices.add(Math.floor(Math.random() * limit));
        }
        return Array.from(indices);
    };

    // Initialize imageIndexes with random indices
    const [imageIndexes, setImageIndexes] = useState(() => generateUniqueIndexes(4, smallerImageUrls.length));

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndexes(generateUniqueIndexes(4, smallerImageUrls.length));
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [smallerImageUrls.length]);

    const bannerImageUrl = "https://nurawsbucket.s3.amazonaws.com/image_processing20210901-15070-19y5146.gif";

    return (
        <div className="featured-page-container">
            <div className="smaller-image-card left-image-top" style={{ top: '25%' }}>
                <img src={smallerImageUrls[imageIndexes[0]]} alt="Left Top Image" className="smaller-image" />
            </div>
            <div className="smaller-image-card left-image-bottom" style={{ top: '75%' }}>
                <img src={smallerImageUrls[imageIndexes[1]]} alt="Left Bottom Image" className="smaller-image" />
            </div>
            <div className="banner-image-container">
                <img src={bannerImageUrl} alt="Banner" className="banner-image" />
            </div>
            <div className="smaller-image-card right-image-top" style={{ top: '25%' }}>
                <img src={smallerImageUrls[imageIndexes[2]]} alt="Right Top Image" className="smaller-image" />
            </div>
            <div className="smaller-image-card right-image-bottom" style={{ top: '75%' }}>
                <img src={smallerImageUrls[imageIndexes[3]]} alt="Right Bottom Image" className="smaller-image" />
            </div>
        </div>
    );
}
