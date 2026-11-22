import "../styles/ProductListing.css";
import ProductCard from "./ProductCard";

function ProductListing({ products }) {
    return(
        <div className="product-listing">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    priceDiscount={product.priceDiscount}
                />
            ))}
        </div>
    )
}

export default ProductListing