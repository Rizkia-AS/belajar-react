import { FaLaptop, FaTabletAlt,FaMobileAlt } from "react-icons/fa"
import useWindowSize from "../hooks/useWindowSize";
// setup useContext

const Header = ({title}) => {
    // menerima data yg telah di destructuring menggunakan useContext dari DataContext
    const {width} = useWindowSize();

    return (
        <header className="Header">
            <h1>{title}</h1>
            {width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
        </header>
    )
}

export default Header
