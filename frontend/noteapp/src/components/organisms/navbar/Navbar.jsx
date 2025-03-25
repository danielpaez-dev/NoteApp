import React, { useEffect, useState } from "react";
import "./styles/css/navbar.css";
import Title from "../../atom/Title/Title.jsx";
import Searcher from "../../molecules/Searcher/Searcher.jsx";
import Option from "../../molecules/Option/Option.jsx";
import Avatar from "../../molecules/Avatar/Avatar.jsx";
import Filter from "../../molecules/Filter/Filter.jsx";

function Navbar() {
  const [avatarSrc, setAvatarSrc] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          const imageUrl = data.results[0].picture.medium;
          setAvatarSrc(imageUrl);
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
        <Searcher />
        <div id="profile-options">
          <Option type="Add Notes" />
          <Avatar src={avatarSrc} alt="Random User Avatar" />
        </div>
      </nav>
      <Filter />
    </header>
  );
}

export default Navbar;
