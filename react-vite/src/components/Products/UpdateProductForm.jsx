import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductImageThunk, updateExistingProduct, deleteProductImageThunk,getSingleProduct } from '../../redux/products';
import ImageForm from '../ImageForm/ImageForm';
import './UpdateProductForm.css'

function ProductImage({ image, edit,onDelete }) {
    const dispatch = useDispatch();

    // const deleteImage = () => {
    //     dispatch(deleteProductImageThunk(image.id));
    // }
    const deleteImage = async () => {
        await dispatch(deleteProductImageThunk(image.id));
        onDelete();
    }

    return (
        <div className="product-image">
            { edit ? <FaXmark onClick={deleteImage} /> : null }
            <img src={image.url} alt="Product" />
        </div>
    );
}

export default function EditProductForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams()
    const { user } = useSelector(state => state.session);
    const { products } = useSelector(state => state.products);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [validators, setValidators] = useState({})
    const [refresh, setRefresh] = useState(false);



    let singleProduct= null
    if (products && products[productId]) {
        singleProduct = products[productId];

    }
    // console.log("singleProduct2", singleProduct)
    useEffect(() => {
        dispatch(getSingleProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {

        if (singleProduct) {
            setName(singleProduct.name);
            setDescription(singleProduct.description);
            setCategory(singleProduct.category);
            setPrice(singleProduct.price);
        }
    }, [singleProduct])

    if (!user || !products || Object.values(user).length === 0) {
        return <Navigate to='/' replace={true}/>
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const errors = {}

        if (!name.length) errors.name = "Product name is required"
        if (name.length > 200) errors.name = "Name must be less than 200 characters"
        if (!description.length) errors.description = "Description of product is required"
        if (!category.length) errors.category = "Product category is required"
        if (!price) errors.price = "Price is required"
        if (price < 0 || price > 9999.99 ) errors.price = "Price must be between $0 and $9,999.99"



        setValidators(errors)

        if (Object.values(errors).length === 0) {
            const payload = {
                provider_id: user.id,
                name,
                description,
                category,
                price
            }

            const data = await dispatch(updateExistingProduct(payload, productId))

            if (data) {
                setValidators({error: data})
            } else {
                await navigate(`/products/${productId}`);
            }
        }
    }
    // console.log("singleProduct", singleProduct)
    const handleImageUpdate = () => {
        dispatch(getSingleProduct(productId));
        // dispatch(addProductImageThunk(productId))
        setRefresh(!refresh);  // Toggle to force re-render
    }

    return (
        <div>
            <div className='image-management'>
                <h2>Edit Product Images </h2>
                <p className='image-limit-info'>Product images(maximum 5)</p>
                <div className='edit-form-existing-images'>
                    {singleProduct && singleProduct.images && singleProduct.images.map((image) => (
                        <div key={image.id} className='edit-form-each-image'>
                            <ProductImage key={image.id} image={image} edit={true} onDelete={handleImageUpdate} />
                        </div>
                    ))}
                </div>
                 {singleProduct?.images && singleProduct.images.length < 5 && (
                     <div className='image-upload-section'>
                        <p className='file-extension-info'>*Image must have approved file extension: webp, png, jpg, pdf, jpeg, gif</p>
                        <ImageForm imageThunk={(image) => addProductImageThunk(productId, image)} onImageAdded={handleImageUpdate} />
                    </div>
                 )}
            </div>
            <form className="edit-product-form" onSubmit={handleSubmit}>
            <h2>Edit product listing</h2>
                <div>
                    <p>Provide your product name.</p>
                    <input
                        placeholder="Product name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='edit-product-input name-input'
                    />
                    {validators.name && <p className="product-form-errors">{validators.name}</p>}
                </div>
                <div>
                    <p>A detailed description  for your product.</p>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className='edit-product-input description-input'
                    />
                    {validators.description && <p className="product-form-errors">{validators.description}</p>}
                </div>
                <div>
                    <p>The best category that your product fits into.</p>
                    <select name='category' onChange={e => setCategory(e.target.value)} value={category} className='edit-product-category'>
                        <option value='' disabled={true}>(select one)</option>
                        <option value="Smart Home Automation Products">Smart Home Automation Products</option>
                        <option value="Smart Entertainment Products">Smart Entertainment Products</option>
                        <option value="Smart Office Products">Smart Office Products</option>
                        <option value="Smart Pet Products">Smart Pet Products</option>
                    </select>
                    {validators.category && <p className="product-form-errors">{validators.category}</p>}
                </div>
                <div>
                    <p>Set a price for your item.</p>
                    <span className='price-dollar-sign'>$</span>
                    <input
                        placeholder ="0.00"
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className='edit-product-input price-input'
                    />
                    {validators.price && <p className="product-form-errors">{validators.price}</p>}
                </div>
                <div>
                    <button type='submit' className="edit-product-button">Update Product</button>
                </div>
            </form>

        </div>
    )
}
