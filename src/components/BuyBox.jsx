import { useState } from "react";
import starIcon from "../assets/star-filled.svg";
import "../styles/BuyBox.css";
import ProductOptions from "./ProductOptions";

function BuyBox({
    name, 
    reference,
    stars,
    rating,
    price,
    priceDiscount,
    description,
    children,
}) {

    const [size, setSize] = useState(null);
    const [color, setColor] = useState(null);

    const finalPrice = priceDiscount ?? price;

    function formatPrice(value) {
        return Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function getColorName(hex) {
        const colorNames = {
            "#6feeff": "Azul",
            "#ff6969": "Vermelho",
            "#5d5d5d": "Cinza",
            "#6d70b7": "Lilás",
        };
        return colorNames[hex?.toLowerCase()] ?? hex;
    }

    function handleBuy() {
        if (!size || !color) {
            alert("Selecione o tamanho e a cor antes de comprar.");
            return;
        }

        alert(
            `Produto: ${name}\nTamanho: ${size}\nCor: ${getColorName(color)}\nPreço: ${formatPrice(finalPrice)}`
        );
    }
    
    return (
        <>
            <div className="buy-box">
                <h1 className="buy-box-name">{name}</h1>
                <p className="buy-box-reference">{reference}</p>

                <div className="buy-box-reviews">
                    <div 
                        className="buy-box-rating"
                        aria-label={`${stars} de 5 estrelas`}
                    >
                        <span>{stars}</span>
                        <img src={starIcon} alt="" />
                    </div>

                    <span className="buy-box-review-count">
                        ({rating} avaliações)
                    </span>
                </div>

                    <div className="buy-box-prices">
                        <span className="buy-box-current-price"> 
                            {formatPrice(finalPrice)}
                        </span> 

                        {priceDiscount != null && (
                            <span className="buy-box-original-price">
                                {formatPrice(price)}
                            </span>
                        )}
                    </div>

                    <div className="buy-box-description">
                        <h2>Descrição do produto</h2>
                        <p>{description}</p>
                    </div>

                    <div className="buy-box-variations">
                        <div className="buy-box-option">
                            <h2>Tamanho</h2>

                            <ProductOptions 
                                options={["39", "40", "41", "42", "43"]}
                                shape="square"
                                type="text"
                                value={size}
                                onChange={setSize}
                                name="Tamanho do produto"
                            />
                        </div>

                        <div className="buy-box-option">
                            <h2>Cor</h2>

                            <ProductOptions 
                                options={[
                                    "#6feeff",
                                    "#ff6969",
                                    "#5d5d5d",
                                    "#6d70b7",
                                ]}
                                shape="circle"
                                type="color"
                                value={color}
                                onChange={setColor}
                                name="Cor do produto"
                            />
                        </div>
                    </div>

                    {children}

                    <button
                        type="button" 
                        className="buy-box-button"
                        onClick={handleBuy}
                    >
                        COMPRAR
                    </button>
                </div>
        </>
    );
}

export default BuyBox