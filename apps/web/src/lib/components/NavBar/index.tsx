import { LogoPng } from '$web/assets/images';
import { useAuthApi } from '$web/base/auth';
import { Cog as Settings, LogOut } from '@styled-icons/boxicons-regular';
import { Link, useNavigate } from 'react-router-dom';
import { NavBarStyleWrapper } from './navbar.style';

export function NavBar() {
  const { session, logout } = useAuthApi();
  const navigate = useNavigate();

  const openSettings = () => navigate('/user/settings');

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
        <span>{session.getDisplayName()}</span>
        <img src={session.getAvatarUrl()} alt="user" />
        <LogOut className="text-btn" size={20} onClick={logout} />
        <Settings className="text-btn" size={20} onClick={openSettings} />
      </div>
    </NavBarStyleWrapper>
  );
}
