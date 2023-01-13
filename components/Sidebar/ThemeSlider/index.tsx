import Image from "next/image";
import lightThemeIcon from "../../../assets/icon-light-theme.svg";
import darkThemeIcon from "../../../assets/icon-dark-theme.svg";

const ThemeSlider = () => {
  return (
    <div className="theme-slider">
      <Image
        src={lightThemeIcon.src}
        alt="light theme"
        width={lightThemeIcon.width}
        height={lightThemeIcon.height}
      />

      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" />
      </label>

      <Image
        src={darkThemeIcon.src}
        alt="dark theme"
        width={darkThemeIcon.width}
        height={darkThemeIcon.height}
      />
    </div>
  );
};

export default ThemeSlider;
