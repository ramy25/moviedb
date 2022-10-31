import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={classes.mainNav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/discover"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Discover
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
