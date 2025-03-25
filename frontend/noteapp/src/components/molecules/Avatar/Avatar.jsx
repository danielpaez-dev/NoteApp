import Image from "../../atom/Image/Image";
import "./avatar.css";

const Avatar = ({ src, alt }) => {
  return (
    <div className="avatar">
      <Image src={src} alt={alt} className="avatar" />
    </div>
  );
};

export default Avatar;
