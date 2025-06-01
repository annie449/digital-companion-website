import React from 'react';
import { NavLink } from 'react-router-dom';
import './GlobalNavigation.css';

function GlobalNavigation() {
  return (
    <nav className="global-navigation">
      <div className="nav-logo">
        <NavLink to="/">Digital Companion</NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/estate" className={({ isActive }) => isActive ? 'active' : ''}>
            Estate
          </NavLink>
        </li>
        <li>
          <NavLink to="/journal" className={({ isActive }) => isActive ? 'active' : ''}>
            Journal
          </NavLink>
        </li>
        <li>
          <NavLink to="/meditation" className={({ isActive }) => isActive ? 'active' : ''}>
            Meditation
          </NavLink>
        </li>
        <li>
          <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" className={({ isActive }) => isActive ? 'active' : ''}>
            Help
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default GlobalNavigation;
