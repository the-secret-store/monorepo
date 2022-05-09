import { NavBarStyleWrapper } from './navbar.style';
import { LogoPng } from '../../../assets/images';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <NavBarStyleWrapper>
      <div className="brand">
        <img src={LogoPng} alt="logo" />
        <caption>The Secret Store</caption>
      </div>
      <ul className="links">
        <li>
          <Link to={'/projects'}>Projects</Link>
        </li>
      </ul>
      <div className="user">
        <span>User</span>
        <img src="https://source.unsplash.com/WNoLnJo7tS8/100x100" alt="user" />
      </div>
    </NavBarStyleWrapper>
  );
}
