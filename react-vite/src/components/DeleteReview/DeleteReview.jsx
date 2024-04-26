import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from "../../redux/reviews"
import './DeleteReview.css';

function DeleteReview({ reviewId, onReviewDeleted }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDeleteReview = async () => {
        await dispatch(deleteReviewThunk(reviewId));
        onReviewDeleted();
        closeModal();
    };


    return (
        <div className='delete-review'>
            <h1 className='confirm-delete-message'>Are you sure you want to delete this review?</h1>
            <button className='button confirm' onClick={handleDeleteReview}>
                Yes, Delete
            </button>
            <button className='delete-button cancel' onClick={closeModal}>
                Cancel
            </button>
        </div>
    )

}

export default DeleteReview;
