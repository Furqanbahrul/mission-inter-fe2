import { Link } from "react-router-dom";

import LogoImage from "../assets/images/Logo.png";


function Logo() {
    return (
        <Link to="/">
            <img src={LogoImage} alt="Logo" className="w-36.25 lg:w-48.25" />
        </Link>
    );
}

export default Logo;