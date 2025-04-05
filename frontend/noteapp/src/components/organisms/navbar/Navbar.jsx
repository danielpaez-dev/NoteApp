import React, { useEffect, useState } from "react";
import "./styles/css/navbar.css";
import Title from "../../atom/Title/Title.jsx";
import Searcher from "../../molecules/Searcher/Searcher.jsx";
import Avatar from "../../molecules/Avatar/Avatar.jsx";
import Filter from "../../molecules/Filter/Filter.jsx";
import Option from "../../molecules/Option/option.jsx";

function Navbar({ avatarSrc, onNoteCreated, onFilterChange, onSearch }) {
  return (
    <header>
      <nav>
        <Title />
        <Searcher onSearch={onSearch} />
        <div id="profile-options">
          <Option onNoteCreated={onNoteCreated} />
          <Avatar src={avatarSrc} alt="Random User Avatar" />
        </div>
      </nav>
      <div className="container p-3">
        <Filter source="navbar" onChange={onFilterChange} />
      </div>
    </header>
  );
}

export default Navbar;
