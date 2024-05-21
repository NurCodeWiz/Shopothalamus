import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../redux/products';
import ImageProduct from '../ImageProduct/ImageProduct';
import './CreateProductForm.css';

function formDataFromObject(obj) {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        if (value instanceof File) {
            formData.append(key, value, value.name);
        } else {
            formData.append(key, value);
        }
    });
    return formData;
}

export default function CreateProductForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [nm, setNm] = useState("");
    const [desc, setDesc] = useState("");
    const [cat, setCat] = useState("");
    const [prc, setPrc] = useState(0);
    const [errs, setErrs] = useState({});
    const [fl, setFl] = useState(null);
    const [loadingImg, setLoadingImg] = useState(false);

    if (!user || Object.values(user).length === 0) {
        return <Navigate to='/' replace={true}/>
    }

    async function handleSubmission(e) {
        e.preventDefault();

        const validationErrors = {}

        if (!nm.length) validationErrors.nm = "Product name is required"
        if (nm.length > 200) validationErrors.nm = "Name must be less than 200 characters"
        if (!desc.length) validationErrors.desc = "Description of product is required"
        if (!cat.length) validationErrors.cat = "Product category is required"
        if (!prc) validationErrors.prc = "Price is required"
        if (prc < 0 || prc > 9999.99 ) validationErrors.prc = "Price must be between $0 and $9,999.99"
        if (!fl) validationErrors.fl = "Product must include an image"

        setErrs(validationErrors)

        if (Object.values(validationErrors).length === 0) {
            setLoadingImg(true);

            const payload = {
                name: nm,
                description: desc,
                category: cat,
                price: prc,
                image: fl
            }

            const formData = formDataFromObject(payload);
            console.log(payload)


            const data = await dispatch(createNewProduct(formData))

            if (data && !data.id) {
                setErrs({error: data})
            } else {
                await nav(`/products/${data.id}`);
            }
        }
    }

    return (
        <div>
            <form className="prod-form" onSubmit={handleSubmission} encType='multipart/form-data'>
            <h2>Create a new product listing</h2>
                <div>
                    <p>Provide your product with a descriptive name.</p>
                    <input
                        placeholder="Product name"
                        type="text"
                        value={nm}
                        onChange={e => setNm(e.target.value)}
                    />
                    {errs.nm && <p className="form-error">{errs.nm}</p>}
                </div>
                <div>
                    <p>Give your product a detailed description.</p>
                    <textarea
                        placeholder="Description"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                    {errs.desc && <p className="form-error">{errs.desc}</p>}
                </div>
                <div>
                    <p>Choose the best category that your product fits into.</p>
                    <select name='category' onChange={e => setCat(e.target.value)} value={cat}>
                        <option value='' disabled={true}>(select one)</option>
                        <option value="Smart Home Automation Products">Smart Home Automation Products</option>
                        <option value="Smart Entertainment Products">Smart Entertainment Products</option>
                        <option value="Smart Office Products">Smart Office Products</option>
                        <option value="Smart Pet Products">Smart Pet Products</option>
                    </select>
                    {errs.cat && <p className="form-error">{errs.cat}</p>}
                </div>
                <div>
                    <p>Set a price for your item.</p>
                    <span>$</span>
                    <input
                        placeholder ="0.00"
                        type='text'
                        value={prc}
                        onChange={e => setPrc(e.target.value)}
                    />
                    {errs.prc && <p className="form-error">{errs.prc}</p>}
                </div>
                {/* <p>Add an Image.</p>
                <p>*Image must have approved file extension: webp, png, jpg, pdf, jpeg, gif</p>
                <ImageProduct setFile={setFl} />
                { loadingImg && <p>Loading...</p> }
                {errs.fl && <p className="form-error">{errs.fl}</p>} */}
                <div>
                <p>Add an Image:</p>
                <p className="image-upload-instructions">*Image must have an approved file extension: webp, png, jpg, pdf, jpeg, gif.</p>
                 <ImageProduct setFile={setFl} />
                 {loadingImg && <p className="loading">Loading image...</p>}
                 {errs.fl && <p className="form-error">{errs.fl}</p>}
                </div>
                <div>
                    <button type='submit' className="prod-submit">Create Product</button>
                </div>
            </form>
        </div>
    )
}
