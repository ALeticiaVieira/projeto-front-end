import { Link } from "react-router-dom";
import "../styles/Information.css";

function Information({ title, informations }) {
    return (
        <>
            <div className="footer-information">
                <h3>{title}</h3>

                <ul>
                    {informations.map((item) => (
                        <li key={item.link}>
                            <Link to={item.link}>
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>  
        </>
    );
}

export default Information