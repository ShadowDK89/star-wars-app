import { Link } from 'react-router-dom';
import starWarsLogo from '../../assets/img/Star_Wars_Logo.svg';
import './Header.scss';

function Header() {
  return (
    <header className="star-wars__header">
      <Link to="/">
        <img className="star-wars__header--logo" src={starWarsLogo} alt="" />
      </Link>
    </header>
  );
}

export default Header;
