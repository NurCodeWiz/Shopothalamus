import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductsByCategory } from '../../redux/products';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom"
import "./productsByCategory.css"

export default function ProductsByCategory() {
    const { category } = useParams()
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)

    function categoryTitle() {
        switch(category) {
            case "smart-home":
                return "Smart Home Automation Products";
            case "smart-entertainment":
                return "Smart Entertainment Products";
            case "smart-office":
                return "Smart Office Products";
            case "smart-pets":
                return "Smart Pet Products";
            default:
                return "Category Not Found";
        }
    }

    useEffect(() => {
        dispatch(getProductsByCategory(categoryTitle()))
    }, [dispatch, category])

    return (
        <div className="catalog-wrapper">
            <h2>{categoryTitle()} Products</h2>
            <div className="catalog-grid">
                {!products ? null : Object.values(products).map(product => (
                    <div key={product.id} className="catalog-item">
                        <NavLink to={`/products/${product.id}`}>
                            <img className="item-image" src={product.images[0].url} alt={`${product.name}`} />
                            <div className="item-info">
                                <p>{product.name}</p>
                                <h3>${product.price}</h3>
                            </div>
                        </NavLink>
                        <button>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
