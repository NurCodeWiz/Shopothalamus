import { useEffect } from "react";
import { getAllProducts, getSearchProducts } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, NavLink } from "react-router-dom";
import "./AllProducts.css";

export default function AllProducts() {
    const dispatch = useDispatch();
    const [query] = useSearchParams();
    const search = query.get('name')?.split(' ').join('+');
    const { products, searchResults } = useSelector(state => state.products);

    useEffect(() => {
        if (search) {
            dispatch(getSearchProducts(search));
        } else {
            dispatch(getAllProducts());
        }
    }, [dispatch, search]);

    const productList = search
        ? searchResults ? Object.values(searchResults) : []
        : products ? Object.values(products) : [];
    // console.log("Allproducts:", productList);

    return (
        <div className="catalog-wrapper">
            <h2>All products</h2>
            <div className="catalog-grid">
                {!products ? null : !productList.length ? 'No products found...' : productList.map(product => (
                    <div key={product.id} className="catalog-item">
                        <NavLink to={`/products/${product.id}`}>
                            <img className="item-image" src={`${product.images[0]?.url}`} alt={`${product.name}`} />
                            <div className="item-info">
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
