import { useEffect } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/products";
import { getAllUsersThunk } from "../../redux/users";
import { getAllReviews } from "../../redux/reviews";
import "./OwnedProducts.css"


export default function OwnedProducts() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    // const  { reviews }  = useSelector(state => state.reviews);
    const  user  = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllUsersThunk());
        dispatch(getAllReviews());
        window.scrollTo(0, 0);
    }, [dispatch]);

    if (!products || !products.products || !user)
    {
        return;
    }
    // console.log("products", products.products)
    // console.log("user", user)


    function ownedProducts(products) {
        const ownedArr = Object.values(products).filter(product => product.provider_id === user.id);
        const ownedObj = {};
        for (let product of ownedArr) {
            ownedObj[product.id] = product;
        }
        return ownedObj;
    }

    const filteredProducts = ownedProducts(products.products);
    // console.log('filteredProducts', filteredProducts)

    return (
        <div className="products-page">
            <h2>Manage Your Listings</h2>
            <div className="products-list">
                {filteredProducts && Object.values(filteredProducts).map(product => (
                    <div key={product.id} className="each-product">
                        <NavLink to={`/products/${product.id}`} className="each-product-link">
                            {/* <img className="each-product-image" src={`${Object.values(product.images).filter(productImage => productImage.preview)[0].url}`} alt={`${product?.name}`} /> */}
                            <img
                            className="each-product-image"
                            src={`${Object.values(product.images)?.filter(productImage => productImage)[0]?.url}`}
                            alt={`${product?.name}`}
                            />
                            <div className="each-product-info">
                                <p>{product.name}</p>
                                <h3>${product.price}</h3>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}
