import { useState } from "react";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";
import "../styles/Gallery.css";

function Gallery ({
    
    images = [],
    width = "100%",
    height = "500px",
    radius = "4px",
    showThumbs = false,
    className = "",
    activeIndex,
    onSlideChange,
}) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const selectedIndex = activeIndex ?? currentIndex;
    
    function changeImage(index) {
        if (activeIndex === undefined) {
            setCurrentIndex(index);
        }

        onSlideChange?.(index);
    }

    const galleryWidth = 
        typeof width === "number" ? `${width}px` : width;
        
    const galleryHeight =
        typeof height === "number" ? `${height}px` : height;

    const finalWidth = 
        /^\d+$/.test(galleryWidth)
        ? `${galleryWidth}px`
        : galleryWidth;

    const finalHeight =
        /^\d+$/.test(galleryHeight)
        ? `${galleryHeight}px`
        : galleryHeight;

    function nextImage() {
        changeImage(Math.min(selectedIndex + 1, images.length -1));
    }

    function previousImage() {
        changeImage(Math.max(selectedIndex -1, 0));
    }

    if (images.length === 0) {
        return null;
    }
        
    return(
        <>
            <div 
                className={`gallery ${className}`}
                style={{
                    maxWidth: finalWidth,
                    "--gallery-height": finalHeight,
                    "--gallery-radius": radius,
                }}
            >
                <div className="gallery-viewport">
                    <div
                        className="gallery-track"
                        style={{
                            transform: `translateX(-${selectedIndex * 100}%)`,
                        }}
                    >
                        {images.map((image, index) => (
                            <div className="gallery-slide" key={index}>
                                <img
                                    src={image.src}
                                    alt={image.alt || `Imagem ${index + 1}`} 
                                />
                            </div>
                        ))}
                    </div>

                    <button 
                        type="button"
                        className="gallery-arrow gallery-arrow-left"
                        onClick={previousImage}
                        disabled={selectedIndex === 0}
                        aria-label="Imagem anterior"
                    >
                        <img src={arrowLeft} alt="" />
                    </button>

                    <button
                        type="button"
                        className="gallery-arrow gallery-arrow-right"
                        onClick={nextImage}
                        disabled={selectedIndex === images.length - 1}
                        aria-label="Próxima imagem"
                    >
                        <img src={arrowRight} alt="" />
                    </button>
                </div>
                
                {showThumbs && (
                    <div className="gallery-thumbnails">
                        {images.map((image, index) => (
                            <button
                                type="button"
                                key={index}
                                className={`gallery-thumbnail ${
                                    selectedIndex === index ? "selected" : ""
                                }`}
                                onClick={() => changeImage(index)}
                                aria-label={`Selecionar imagem ${index + 1 }`}
                                aria-pressed={selectedIndex === index}
                            >
                                <img 
                                    src={image.src}
                                    alt=""
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Gallery