import cartIcon from "../assets/mini-cart.svg";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "../styles/Header.css";

function Header() {
    
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault();

        const term = search.trim();

        if (!term) return;

        navigate(`/products?filter=${encodeURIComponent(term)}`);
        setMenuOpen(false);
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    return(
        <>
            <header className="site-header">
                <div className="header-container">
                    <div className="header-top">

                        <button 
                            type="button"
                            className="menu-toggle"
                            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setMenuOpen((previous) => !previous)} 
                        >
                            <Menu />  
                        </button>    

                        <Link to="/" className="header-logo">
                            <Logo />
                        </Link>

                        <form className="header-search" onSubmit={handleSearch}>
                            <input
                                type="search"
                                placeholder="Pesquisar produto..."
                                aria-label="Pesquisar produto"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button type="submit" aria-label="Buscar">
                                <Search size={22} />
                            </button>
                        </form>

                        <div className="header-actions">
                            <Link to="/register" className="register-link">
                                Cadastre-se
                            </Link>

                            <Link to="/login" className="login-button">
                                Entrar
                            </Link>
                        </div>

                        <span className="header-cart" aria-label="Carrinho de compras">
                            <img src={cartIcon} alt="" width="24" height="24" />
                        </span>
                    </div>

                    <nav
                        className="header-nav"
                        aria-label="Navegação principal"
                    >
                        <NavLink to="/" end>
                            Home
                        </NavLink>

                        <NavLink to="/products">
                            Produtos
                        </NavLink>    

                        <NavLink to="/categories">
                            Categorias
                        </NavLink>

                        <NavLink to="/orders">
                            Meus pedidos
                        </NavLink>
                    </nav>    
                </div>

                {menuOpen && (
                    <div className="mobile-menu-layer">
                        <button
                            type="button"
                            className="mobile-menu-backdrop"
                            onClick={closeMenu}
                            aria-label="Fechar menu"
                        />

                        <aside
                            className="mobile-menu"
                            id="mobile-menu"
                            aria-label="Menu mobile"
                        >
                            <h2 className="mobile-menu-title">Páginas</h2>

                            <nav className="mobile-menu-nav">
                                <NavLink to="/" end onClick={closeMenu}>
                                    Home
                                </NavLink>

                                <NavLink to="/products" onClick={closeMenu}>
                                    Produtos
                                </NavLink>

                                <NavLink to="/categories" onClick={closeMenu}>
                                    Categorias
                                </NavLink>

                                <NavLink to="/orders" onClick={closeMenu}>
                                    Meus pedidos
                                </NavLink>
                            </nav>

                            <div className="mobile-menu-actions">
                                <Link 
                                    to="/login"
                                    className="login-button"
                                    onClick={closeMenu}
                                >
                                    Entrar
                                </Link>

                                <Link
                                    to="/register"
                                    className="register-link"
                                    onClick={closeMenu}
                                >
                                    Cadastre-se
                                </Link>
                            </div>
                        </aside>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header