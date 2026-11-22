import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import FilterGroup from "../components/FilterGroup";
import ProductListing from "../components/ProductListing";
import Section from "../components/Section";
import { products } from "../data/products";
import "../styles/ProductListingPage.css";


function ProductListingPage() {

    const [searchParams , setSearchParams] = useSearchParams();
    const search = searchParams.get("filter") ?? "";

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [sortOrder, setSortOrder] = useState("relevance");
    const [filtersOpen, setFiltersOpen] = useState(false);

    const brandOptions = [
        { text: "Adidas" },
        { text: "Calenciaga" },
        { text: "K-Swiss" },
        { text: "Nike" },
        { text: "Puma" },
    ];

    const categoryOptions = [
        { text: "Esporte e lazer" },
        { text: "Casual" },
        { text: "Utilitário" },
        { text: "Corrida" },
    ];

    const genderOptions = [
        { text: "Masculino" },
        { text: "Feminino" },
        { text: "Unissex" },
    ];

    const conditionOptions = [
        { text: "Novo" },
        { text: "Usado" },
    ];

    function normalize(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function getFinalPrice(product) {
        return product.priceDiscount ?? product.price;
    }

    function clearFilters() {
        setBrands([]);
        setCategories([]);
        setGenders([]);
        setConditions([]);
        setSortOrder("relevance");
        setSearchParams({});
        setFiltersOpen(false);
    }

        const filteredProducts = products.filter((product) => {
            const searchableText = [
                product.name, 
                product.brand,
                product.category,
                product.gender,
            ].join(" ");
        

        const matchesSearch = normalize(searchableText)
            .includes(normalize(search.trim()));


        const matchesBrand = 
            brands.length === 0 || brands.includes(product.brand);
            
        const matchesCategory = 
            categories.length === 0 ||
            categories.includes(product.category);

        const matchesGender = 
            genders.length === 0 || genders.includes(product.gender);

        const matchesCondition = 
            conditions.length === 0 ||
            conditions.includes(product.condition);
        
        return (
            matchesSearch &&
            matchesBrand &&
            matchesCategory &&
            matchesGender &&
            matchesCondition
        );
    });

    const sortedProducts = [...filteredProducts];

    if (sortOrder === "lowest") {
        sortedProducts.sort(
            (a, b) => getFinalPrice(a) - getFinalPrice(b)
        );
    }

    if (sortOrder === "highest") {
        sortedProducts.sort(
            (a, b) => getFinalPrice(b) - getFinalPrice(a)
        );
    }

    return(
        <>
            <div className="listing-page">
                <div className="listing-container">
                    <div className="listing-toolbar">
                        <label className="listing-sort">
                            <span>Ordenar por:</span>

                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="relevance">Mais relevantes</option>
                                <option value="lowest">Menor preço</option>
                                <option value="highest">Maior preço</option>
                            </select>
                        </label>

                        <button
                            type="button"
                            className="listing-filter-button"
                            onClick={() => setFiltersOpen(true)}
                        >
                            Filtrar
                        </button>
                    </div>

                    <div className="listing-results">
                        {search && <strong>Resultados para "{search}"</strong>}
                    </div>

                    <div className="listing-layout">
                        {filtersOpen && (
                            <div
                                className="listing-overlay"
                                onClick={() => setFiltersOpen(false)}
                            />
                        )}

                        <aside
                            className={`listing-sidebar ${filtersOpen ? "filters-open" : ""}`}
                        >
                            <div className="listing-sidebar-heading">
                                <h2>Filtrar por</h2>
                                <button 
                                    type="button"
                                    className="listing-close"
                                    onClick={() => setFiltersOpen(false)}
                                    aria-label="Fechar filtros"
                                >
                                    ✕
                                </button>
                            </div>
                            <hr />
                            <FilterGroup
                                title="Marca"
                                options={brandOptions}
                                selected={brands}
                                onChange={setBrands}
                            />

                            <FilterGroup 
                                title="Categoria"
                                options={categoryOptions}
                                selected={categories}
                                onChange={setCategories}
                            />

                            <FilterGroup 
                                title="Gênero"
                                options={genderOptions}
                                selected={genders}
                                onChange={setGenders}
                            />

                            <FilterGroup
                                title="Estado"
                                inputType="radio"
                                options={conditionOptions}
                                selected={conditions}
                                onChange={setConditions}
                            />

                            <button 
                                type="button"
                                className="listing-clear"
                                onClick={clearFilters}
                            >
                                Limpar filtros
                            </button>
                        </aside>

                        <div className="listing-products">
                            {sortedProducts.length > 0 ? (
                                <Section title={`${sortedProducts.length} produtos encontrados`}>
                                    <ProductListing products={sortedProducts} />
                                </Section>
                            ) : (
                                <p className="listing-empty">Nenhum produto encontrado para os filtros selecionados.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductListingPage