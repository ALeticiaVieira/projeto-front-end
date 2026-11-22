import twitterIcon from "../assets/twitter.svg"
import instagramIcon from "../assets/instagram.svg";
import facebookIcon from "../assets/facebook.svg";
import Logo from "./Logo";
import Information from "./Information";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    const informacoes = [
        {text: "Sobre Drip Store", link: "/about"},
        {text: "Segurança", link: "/security"},
        {text: "Wishlist", link: "/wishlist"},
        {text: "Blog", link: "/blog"},
        {text: "Trabalhe conosco", link: "/careers"},
        {text: "Meus pedidos", link: "/orders"},
    ];

    const categorias = [
        {text: "Camisetas", link: "/products?filter=camiseta"},
        {text: "Calças", link: "/products?filter=calça"},
        {text: "Bonés", link: "/products?filter=boné"},
        {text: "Headphones", link: "/products?filter=headphone"},
        {text: "Tênis", link: "/products?filter=tênis"},
    ];

    return(
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <Link to="/" aria-label="Voltar para a página inicial">
                                <Logo variant="footer" />
                            </Link>

                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore eos molestias nostrum vel dolor nesciunt a repellat laborum qui, reiciendis ab in aperiam quia quos earum sequi, laboriosam corporis temporibus.</p>

                            <div className="footer-social">
                                <a 
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                >
                                    <img src={facebookIcon} alt="" />
                                </a>

                                <a 
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <img src={instagramIcon} alt="" />
                                </a>

                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="X"
                                >
                                    <img src={twitterIcon} alt="" /> 
                                </a>
                            </div>
                        </div>
                        <Information 
                            title="Informação"
                            informations={informacoes}
                        />

                        <Information
                            title="Categorias"
                            informations={categorias}
                        />

                        <div className="footer-contact">
                            <h3>Contato</h3>
                            <p>
                                Av.Santos Dumont, 1510 - 1º andar, Aldeota, Fortaleza - CE, 60150-161
                            </p>

                            <p>(85) 3051-3411</p>
                        </div>
                    </div>

                    <hr className="footer-divider" />

                    <p className="footer-copyright">
                        © 2024 Digital Store
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Footer