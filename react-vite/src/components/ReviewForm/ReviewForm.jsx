import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, reviewsByProduct, updateReviewThunk} from "../../redux/reviews";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import './ReviewForm.css';

// function formDataFromObject(obj) {
//     const formData = new FormData();
//     Object.entries(obj).forEach(([key, value]) => {
//         if (value instanceof File) {
//             formData.append(key, value, value.name);
//         } else {
//             formData.append(key, value);
//         }
//     });
//     return formData;
// }

function ReviewForm({productId, review, buttonText, hideForm}) {
    const dispatch = useDispatch();
    const nav = useNavigate()
    const product = useSelector(state => state.products[productId]);
    const [rating, setRating] = useState(review?.rating);
    const [hover, setHover] = useState(0);
    const [review_content, setreview_content] = useState(review?.review_content);
    const [image_url, setimage_url] = useState(review?.image_url)
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!review)
    {
        console.log('Create Review only')
    }

    if (review && (!review_content || !rating || !image_url))
    {
        if (!review_content && review.review_content) {
            setreview_content(review.review_content)
        }

        if (!rating && review.rating) {
            setRating(review.rating)
        }

        if (!image_url && review.image_url) {
            setimage_url(review.image_url)
        }
    }

    const validate = () => {
        const newErrors = {};
        if (!rating || rating < 1 || rating > 5) {
            newErrors.rating = 'Please provide a rating between 1 and 5 stars.';
        }
        if (!review_content || review_content.length < 10) {
            newErrors.minReview = 'Please provide a more detailed review (at least 10 characters).';
        }
        if (review_content?.length > 200) {
            newErrors.maxReview = 'Please keep your review under 200 characters.';
        }
        if(!image_url){
            newErrors.image_url = 'Image is required for your review.'
        }
        return newErrors;
    };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formErrors = validate();
//         setErrors(formErrors);

//         if (Object.keys(formErrors).length === 0) {
//             setIsSubmitting(true);
//             try {
//                 const payload = {
//                     rating,
//                     review_content,
//                     image: image_url
//                 };


//                 const formData = formDataFromObject(payload);
//                 console.log("Form Data:", Array.from(formData.entries()));
//             await dispatch(createReviewThunk(productId, formData));
//             hideForm();
//         } catch (error) {
//                 console.error('Failed to create review:', error);
//                 setErrors(prevErrors => ({ ...prevErrors, submit: 'Failed to submit review. Please try again.' }));
//         } finally {
//                 setIsSubmitting(false);
//         }
//     } else {

//             setErrors(formErrors);
//     }
// };
const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
        console.log('rating', rating)
        console.log('review_content', review_content)
        console.log('image_url', image_url)

        setIsSubmitting(true);
        const payload = {
            rating,
            review_content,
            image: image_url,
        };

        try {

            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (value != null) {
                    formData.append(key, value);
                }
            });

            if (!review)
            {
                await dispatch(createReviewThunk(productId, formData));
                dispatch(reviewsByProduct(productId));
                hideForm();
            }
            else
            {
                await dispatch(updateReviewThunk(review.id, formData))
                dispatch(reviewsByProduct(review.product_id));
                nav(`/products/${review.product_id}`)
            }
        } catch (error) {
            console.error('Failed to create review:', error);
            setErrors(prevErrors => ({
              ...prevErrors,
              submit: 'Failed to submit review. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    }
};

    if (isSubmitting) {
        return <div>Loading...</div>;
    }

    return (
        <div className='review-form-container'>
            <div className='product-review-container'>
                <img src={product?.image_url} alt={product?.name} className='product-review-img' />
                <p className='product-review-name'>Product: {product?.name}</p>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='review-section'>
                    <h2 className='review-heading'>Rating</h2>
                    <div className='rating-field'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label key={star} className='star-label'>
                                <span
                                    className='star'
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(rating)}
                                    onClick={() => setRating(star)}
                                >
                                    {star <= (hover || rating) ? <MdOutlineStar /> : <MdOutlineStarBorder />}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.rating && <p className='error-message'>{errors.rating}</p>}
                </div>
                {/* <div className='review-section'>
                    <h2 className='review-heading'>Add a photo</h2>
                    <input type="file" onChange={(e) => setimage_url(e.target.files[0])} />
                    {errors.image_url && <p className='error-message'>{errors.image_url}</p>}
                </div> */}
                <div className='review-section'>
                    <h2 className='review-heading'>Add a photo</h2>
                    {review && review.image_url && (
                    <img src={review.image_url} alt="Current Review Image" className="review-image-preview" style={{ width: '150px', height: '100px' }}/>
                    )}
                    <input type="file" onChange={(e) => setimage_url(e.target.files[0])} />
                    {errors.image_url && <p className='error-message'>{errors.image_url}</p>}
                </div>
                <div className='review-section'>
                    <h2 className='review-heading'>Add a review</h2>
                    <textarea
                        value={review_content}
                        onChange={(e) => setreview_content(e.target.value)}
                        placeholder='Describe what you liked or disliked about the product...'
                        rows={5}
                        cols={40}
                    />
                    {errors.maxReview && <p className='error-message'>{errors.maxReview}</p>}
                    {errors.minReview && <p className='error-message'>{errors.minReview}</p>}
                </div>
                <button type='submit' className='submit-button'>{buttonText}</button>
            </form>
        </div>
    );
}

export default ReviewForm;
