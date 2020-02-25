import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, Logout }) => {
  return (
    <header className="App-header">
      <ul className="container">
        <li>
          <Link to="/"> Site Title</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/new">New Post</Link>
            </li>
            <li>
              <button
                className="linkLike"
                onClick={e => {
                  e.preventDefault();
                  Logout();
                }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signUp">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
