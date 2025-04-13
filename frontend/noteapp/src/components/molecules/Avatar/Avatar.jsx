import Image from "../../atom/Image/Image";
import User from "../../../assets/images/user.jsx";
import "./avatar.css";

const Avatar = ({ src, alt }) => {
  return (
    <div className="avatar">
      {src ? (
        <Image src={src} alt={alt || "User avatar"} className="avatar" />
      ) : (
        <User />
      )}
    </div>
  );
};

export default Avatar;
