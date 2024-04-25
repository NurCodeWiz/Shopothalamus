// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { createImage } from '../redux/products';

// const UploadPicture = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [image, setImage] = useState(null);
//     const [imageLoading, setImageLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!image) {
//             alert('Please select an image to upload.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append("image", image);

//         setImageLoading(true);

//         try {
//             // Dispatching the action to handle the image upload
//             const result = await dispatch(createPost(formData));


//             if (result.success) {
//                 history.push("/images");
//             } else {
//                 throw new Error('Upload failed');
//             }
//         } catch (error) {
//             alert('Upload error: ' + error.message);
//         } finally {
//             setImageLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//             />
//             <button type="submit" disabled={!image || imageLoading}>
//                 Upload Image
//             </button>
//             {imageLoading && <p>Loading...</p>}
//         </form>
//     );
// };

// export default UploadPicture;
