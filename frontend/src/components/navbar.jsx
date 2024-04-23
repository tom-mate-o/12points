import React from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import { BiSolidHome } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';
import { TiHeartFullOutline } from 'react-icons/ti';
import { FaRankingStar } from 'react-icons/fa6';
import { FaUserFriends } from 'react-icons/fa';

export default function Navbar({ isBellRed, handleIconClick }) {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <NavLink to="/feed">
              <BiSolidHome onClick={handleIconClick} />
            </NavLink>
          </li>

          <li>
            <NavLink to="/voting">
              <TiHeartFullOutline onClick={handleIconClick} />
            </NavLink>
          </li>

          <li>
            <NavLink to="/bet">
              <FaRankingStar onClick={handleIconClick} />
            </NavLink>
          </li>

          <li>
            <NavLink to="/friends">
              <FaUserFriends onClick={handleIconClick} />
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings">
              <IoSettingsSharp onClick={handleIconClick} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
