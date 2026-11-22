import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ id, image, name, price, priceDiscount }) {
    const hasDiscount = priceDiscount != null;
    const discountPercentage = Math.round(
        ((price - priceDiscount) / price) * 100
    )

    function formatPrice(value) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

    return(
        <>
            <Link 
                to={`/product/${id}`}
                className="product-card-link"
            >
                <article className="product-card">
                    <div className="product-card-image">
                        {hasDiscount && (
                            <span className="product-card-discount">
                                {discountPercentage}%OFF
                            </span>
                        )}

                        <img src={image} alt={name} />
                    </div>

                    <h3 className="product-card-name">{name}</h3>

                    <div className="product-card-prices">
                        <span className={hasDiscount ? "old-price" : "current-price"}>
                            {formatPrice(price)}
                        </span>

                        {hasDiscount && (
                            <span className="current-price">
                                {formatPrice(priceDiscount)}
                            </span>
                        )}
                    </div>
                </article>
            </Link>
        </>
    );
}

export default ProductCard