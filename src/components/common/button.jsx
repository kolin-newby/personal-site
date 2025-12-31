import React, { useRef } from "react";

const getRandomColorPair = (colors) => {
  const firstIndex = Math.floor(Math.random() * colors.length);
  let secondIndex = firstIndex;
  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * colors.length);
  }

  return [colors[firstIndex], colors[secondIndex]];
};

const Button = ({
  onClick = null,
  href = null,
  buttonText = null,
  icon = null,
  download = null,
  ringColors = ["#FFF176", "#A5D6A7", "#81D4FA", "#FFAB91", "#F8BBD0"],
}) => {
  const colorPairRef = useRef(getRandomColorPair(ringColors));
  const [ringColor1, ringColor2] = colorPairRef.current;

  const baseClasses =
    "multicolor-shadow flex rounded-lg py-0 mx-3 px-2 items-center justify-center space-x-2";

  const baseStyles = {
    "--ring-color-1": ringColor1,
    "--ring-color-2": ringColor2,
  };

  if (href !== null)
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        download={download ?? null}
        className={baseClasses}
        style={baseStyles}
      >
        {icon !== null && icon}
        {buttonText && <span>{buttonText}</span>}
      </a>
    );

  return (
    <button onClick={onClick} className={baseClasses} style={baseStyles}>
      {icon !== null && icon}
      {buttonText && <span>{buttonText}</span>}
    </button>
  );
};

export default Button;
