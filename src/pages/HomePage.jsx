import Gallery from "../components/Gallery";
import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import ProductListing from "../components/ProductListing";
import { products } from "../data/products";
import bannerTenis from "../assets/banner-tenis.png";
import bannerOrnamento from "../assets/banner-ornamento.png";
import "../styles/HomePage.css";

function HomePage() {
    const slides = [
        {
            id: 1,
            image: bannerTenis,
            label: "Melhores ofertas personalizadas",
            title: "Queima de estoque Nike 🔥",
            description: "Consequant culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur."
        },
        {
            id: 2,
            image: "/home-slide-7.jpeg",
            label: "Ofertas especiais",
            title: "Encontre seu próximo estilo",
            description: "Confira nossa seleção de produtos e aproveite as ofertas da Digital Store.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const activeSlide = slides[currentSlide];

    const galleryImages = slides.map((slide) => ({
        src: slide.image,
        alt: slide.title,
    }));

    const collections = [
        { id: 1, image: "/collection-1.png", name: "Novo drop Supreme" },
        { id: 2, image: "/collection-2.png", name: "Coleção Adidas" },
        { id: 3, image: "/collection-3.png", name: "Novo Beats Bass"},
    ];

    const categories = [
        {name: "Camisetas", image: "/camiseta.svg", filter: "camiseta"},
        {name: "Calças", image: "/calca.svg", filter: "calça"},
        {name: "Bonés", image: "/calca2.svg", filter: "boné"},
        {name: "Headphones", image: "/fones.svg", filter: "headphone"},
        {name: "Tênis", image: "/tenis.svg", filter: "tênis"},
    ];
    
    return (
        <>
            <div className="home-page">
                <section className="home-hero">
                    <div className="home-hero-container">
                        {currentSlide === 0 && (
                            <img 
                                src={bannerOrnamento}
                                alt=""
                                className="home-hero-ornament"
                                aria-hidden="true"
                            />
                        )}
                        <div className="home-hero-content">
                            <span className="home-hero-label">
                                {activeSlide.label}
                            </span>
                            
                            <h1>{activeSlide.title}</h1>
                            <p>{activeSlide.description}</p>

                            <Link to="/products" className="home-hero-button">
                                Ver Ofertas
                            </Link>
                        </div>
                        <div className="home-hero-image">
                            <Gallery
                                images={galleryImages}
                                width="1440"
                                height="681"
                                radius="4px"
                                className="home-banner-gallery"
                                activeIndex={currentSlide}
                                onSlideChange={setCurrentSlide}
                            />
                        </div>
                    </div>

                    <div className="home-hero-dots" aria-label="Selecionar oferta">
                        {slides.map((slide, index) => (
                            <button 
                                key={slide.id}
                                type="button"
                                className={`home-hero-dot ${currentSlide === index ? "active" : ""}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Mostrar oferta ${index + 1}`}
                                aria-pressed={currentSlide === index}
                            />
                        ))}
                    </div>
                </section>

                <div className="home-main">
                    <Section 
                        title="Coleções em destaque"
                        titleAlign="center"
                    >
                        <div className="home-collections">
                            {collections.map((collection) => (
                                <Link 
                                    key={collection.id}
                                    to="/products"
                                    className="home-collection"
                                    aria-label={`Ver ${collection.name}`}
                                >
                                    <img
                                        src={collection.image}
                                        alt={collection.name}
                                    />

                                    <span className="home-collection-discount">
                                        30% OFF
                                    </span>

                                    <span className="home-collection-button">
                                        Comprar
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </Section>

                    <Section 
                        title="Coleções em destaque"
                        titleAlign="center"
                    >
                        <div className="home-categories">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    to={`/products?filter=${encodeURIComponent(category.filter)}`}
                                    className="home-category"
                                >
                                    <span className="home-category-icon">
                                        <img src={category.image} alt="" />
                                    </span>

                                    <span className="home-category-name">
                                        {category.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </Section>

                    <Section 
                        title="Produtos em alta"
                        link={{ text: "Ver todos →", href: "/products" }}
                    >
                        <ProductListing products={products.slice(0, 8)} />
                    </Section>
                </div>

                <section className="home-special">
                    <div className="home-special-container">
                        <div className="home-special-image">
                            <img
                                src="/oferta-especial.svg"
                                alt="Air Jordan edição de colecionador"
                            />
                        </div>

                        <div className="home-special-content">
                            <span className="home-special-label">
                                Oferta especial
                            </span>

                            <h2>Air Jordan edição de colecionador</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto quisquam consequatur deserunt nulla sapiente alias eligendi quam nihil perferendis voluptatem sint voluptatibus aspernatur doloremque, facere cupiditate quas fugiat magnam optio!</p>

                            <Link to="/products" className="home-special-button">
                                Ver Oferta
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );    
}

export default HomePage