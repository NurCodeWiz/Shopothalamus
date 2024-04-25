// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createImage } from '../store/actions';

// function ImageForm() {
//     const dispatch = useDispatch();
//     const [image, setImage] = useState(null);
//     const [imageLoading, setImageLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setImageLoading(true);

//         const formData = new FormData();
//         formData.append("image", image);

//         await dispatch(createImage(formData));
//         setImageLoading(false);
//         setImage(null);
//     };

//     return (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <p className="image-input-label">Add an Image</p>
//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//             />
//             <button type="submit" disabled={!image || imageLoading}>
//                 Submit
//             </button>
//             {imageLoading && <p>Loading...</p>}
//         </form>
//     );
// }

// export default ImageForm;
