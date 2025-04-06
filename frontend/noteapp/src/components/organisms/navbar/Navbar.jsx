import React from "react";
import "./styles/css/navbar.css";
import Title from "../../atom/Title/Title.jsx";
import Searcher from "../../molecules/Searcher/Searcher.jsx";
import Avatar from "../../molecules/Avatar/Avatar.jsx";
import Filter from "../../molecules/Filter/Filter.jsx";
import Option from "../../molecules/Option/option.jsx";
import { Dropdown } from "react-bootstrap";

function Navbar({
  avatarSrc,
  onNoteCreated,
  onFilterChange,
  onSearch,
  onLogout,
}) {
  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <header>
      <nav>
        <Title />
        <Searcher onSearch={onSearch} />
        <div id="profile-options">
          <Option onNoteCreated={onNoteCreated} />

          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              id="avatar-dropdown"
              style={{ cursor: "pointer" }}
            >
              <Avatar src={avatarSrc} alt="Random User Avatar" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={handleLogout}
                className="bg-danger text-white"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
      <div className="container p-3">
        <Filter source="navbar" onChange={onFilterChange} />
      </div>
    </header>
  );
}

export default Navbar;
