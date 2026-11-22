import { Link, useParams } from "react-router-dom";
import Gallery from "../components/Gallery";
import BuyBox from "../components/BuyBox";
import Section from "../components/Section";
import ProductListing from "../components/ProductListing";
import { products } from "../data/products";
import "../styles/ProductViewPage.css";

function ProductViewPage() {
    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return(
            <div className="product-view-not-found">
                <h1>Produto não encontrado</h1>
                <p>Não encontramos o produto solicitado.</p>
                <Link to="/products">
                    Voltar para produtos
                </Link>
            </div>
        );
    }

    const images = [
        {
            src: product.image,
            alt: `${product.name} - imagem 1`,
        },
        {
            src: "/product-image-2.jpeg",
            alt: `${product.name} - imagem 2`,
        },
        {
            src: "/product-image-3.jpeg",
            alt: `${product.name} - imagem 3`,
        },
        {
            src: "/product-image-4.jpeg",
            alt: `${product.name} - imagem 4`,
        },
        {
            src: "/product-image-5.jpeg",
            alt: `${product.name} - imagem 5`,
        },
    ];

    const recommendedProducts = products
        .filter((item) => item.id !== product.id)
        .slice(0, 4);

    return(
        <>
            <div className="product-view-page">
                <div className="product-view-container">
                    <nav className="product-view-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/products">Produtos</Link>
                        <span>/</span>
                        <span>{product.name}</span>
                    </nav>

                    <div className="product-view-content">
                        <div className="product-view-gallery">
                            <Gallery 
                                images={images}
                                width="700px"
                                height="570px"
                                radius="4px"
                                showThumbs={true}
                            />
                        </div>

                        <BuyBox
                            name={product.name}
                            reference={`REF: ${String(product.id).padStart(8, "0")}`}
                            stars={4.7}
                            rating={90}
                            price={product.price}
                            priceDiscount={product.priceDiscount}
                            description={`O ${product.name} combina conforto, estilo e praticidade. Uma ótima opção para quem procura qualidade no dia a dia.`}
                        />
                    </div>

                    <div className="product-view-recommendations">
                        <Section
                            title="Produtos recomendados"
                            link={{
                                text: "Ver todos",
                                href: "/products",
                            }}
                        >
                            <ProductListing products={recommendedProducts} />
                        </Section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductViewPage