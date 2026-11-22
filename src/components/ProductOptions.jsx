import { useState } from "react";
import "../styles/ProductOptions.css";

function ProductOptions({
    options = [],
    shape = "square",
    type = "text",
    radius = "4px",
    value,
    onChange,
    name = "Opções do produto",
    
}) {
    const [internalValue, setInternalValue] = useState(null);

    const selectedValue = value !== undefined 
        ? value
        : internalValue;

    function handleSelect(option) {
        if (onChange) {
            onChange(option);
        } else {
            setInternalValue(option);
        }
    }

    return(
        <>
            <div className="product-options">
                <div
                    className="product-options-list"
                    role="group"
                    aria-label={name}
                >
                    {options.map((option) => (
                        <button 
                            key={option}
                            type="button"
                            className={`product-option ${
                                shape === "circle" ? "circle" : "square"
                            } ${
                                selectedValue === option ? "selected" : ""
                            }`}
                            style={{
                                borderRadius: shape === "circle" ? "50%" : radius,
                                backgroundColor: type === "color" ? option: undefined,
                            }}
                            onClick={() => handleSelect(option)}
                            aria-label={
                                type === "color" ? `Selecionar cor ${option}` : `Selecionar tamanho ${option}`  
                            }
                            aria-pressed={selectedValue === option}
                            >
                                {type === "text" ? option : null}
                            </button>     
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductOptions