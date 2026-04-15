import React, { useRef } from "react";

const getRandomColorPair = (colors: string[]): string[] => {
  const firstIndex = Math.floor(Math.random() * colors.length);
  let secondIndex = firstIndex;
  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * colors.length);
  }

  return [colors[firstIndex] ?? "", colors[secondIndex] ?? ""];
};

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | null;
  href?: string | null;
  buttonText?: string | null;
  icon?: React.ReactNode | null;
  download?: string | null;
  ringColors?: string[];
};

const Button = ({
  onClick = null,
  href = null,
  buttonText = null,
  icon = null,
  download = null,
  ringColors = ["#FFF176", "#A5D6A7", "#81D4FA", "#FFAB91", "#F8BBD0"],
}: Props) => {
  const colorPairRef = useRef(getRandomColorPair(ringColors));
  const [ringColor1, ringColor2] = colorPairRef.current;

  const baseClasses =
    "multicolor-shadow flex rounded-lg py-0 mx-3 px-2 items-center justify-center space-x-2";

  const baseStyles = {
    "--ring-color-1": ringColor1,
    "--ring-color-2": ringColor2,
  } as React.CSSProperties;

  if (href !== null)
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        download={download ?? undefined}
        className={baseClasses}
        style={baseStyles}
      >
        {icon !== null && <>{icon}</>}
        {buttonText && <span>{buttonText}</span>}
      </a>
    );

  return (
    <button onClick={onClick ?? undefined} className={baseClasses} style={baseStyles}>
      {icon !== null && <>{icon}</>}
      {buttonText && <span>{buttonText}</span>}
    </button>
  );
};

export default Button;
