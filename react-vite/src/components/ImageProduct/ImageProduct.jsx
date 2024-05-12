import { useState } from "react";
import { FaXmark, FaPlus } from 'react-icons/fa6';
import './ImageProduct.css';

function ImageProduct({ setFile }) {
    const [tempUrl, setTempUrl] = useState("");


    const handleFileChange = e => {
        // If they did not choose a file
        if(!e.target.files.length) {

            // Release old file URL
            if(tempUrl.length) {
                cancelFile();
            }
            return;
        }

        // File to be added
        const newFile = e.target.files[0];
        setFile(newFile);

        // If there was previously a fileURL, release it
        if(tempUrl.length) {
            cancelFile();
        }

        // Show the file in the temp image
        setTempUrl(URL.createObjectURL(newFile));
    }

    const cancelFile = () => {
        URL.revokeObjectURL(tempUrl);
        setTempUrl("");
        setFile(null);
    }

    return (
        <div className="image-product-container">
            { tempUrl.length ?
                <div className="image-container">
                    <FaXmark className="delete-icon" onClick={cancelFile} />
                    <img className='product-image' src={tempUrl} alt={tempUrl} />
                </div>
                :
                <>
                    <div className="image-product">
                        <label>
                            <FaPlus size={40} />
                            <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    size={40}
                            />
                        </label>
                    </div>
                </>
                }
        </div>
    )
}

export default ImageProduct;
