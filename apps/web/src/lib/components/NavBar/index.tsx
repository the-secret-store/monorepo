import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, LogoutCircleR, AccountCircle } from '@styled-icons/remix-line';
import { LogoPng } from '$web/assets/images';
import { useAuthApi } from '$web/base/auth';
import { NavBarStyleWrapper } from './navbar.style';

export function NavBar() {
  const { session, logout } = useAuthApi();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const loadImage = useCallback(async () => {
    return await (await fetch(session.getAvatarUrl())).blob();
  }, [session]);

  useEffect(() => {
    loadImage().then(img => setAvatar(URL.createObjectURL(img)));
  }, [loadImage]);

  const openSettings = () => navigate('/user/settings');

  return (
    <NavBarStyleWrapper>
      <div className="brand">
        <img src={LogoPng} alt="logo" />
        <h2>The Secret Store</h2>
      </div>
      <ul className="links">
        <li>
          <Link to={'/projects'}>Projects</Link>
        </li>
      </ul>
      <div className="user">
        <span>{session.getDisplayName()}</span>
        {!avatar ? <img src={avatar} alt="user" /> : <AccountCircle size={24} />}
        <LogoutCircleR className="text-btn" size={20} onClick={logout} />
        <Settings className="text-btn" size={20} onClick={openSettings} />
      </div>
    </NavBarStyleWrapper>
  );
}
