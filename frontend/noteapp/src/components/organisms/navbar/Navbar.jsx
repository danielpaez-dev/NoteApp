import React, { useEffect, useState } from "react";
import "./styles/css/navbar.css";
import Title from "../../atom/Title/Title.jsx";
import Searcher from "../../molecules/Searcher/Searcher.jsx";
import Avatar from "../../molecules/Avatar/Avatar.jsx";
import Filter from "../../molecules/Filter/Filter.jsx";
import Option from "../../molecules/Option/option.jsx";

function Navbar({ onNoteCreated, onFilterChange, onSearch }) {
  const [avatarSrc, setAvatarSrc] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setAvatarSrc(data.results[0].picture.medium);
        }
      })
      .catch((error) => console.error("Error fetching random user:", error));

    return () => {
      isMounted = false;
    };
  }, []);

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
