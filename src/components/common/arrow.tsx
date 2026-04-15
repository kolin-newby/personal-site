type Props = {
  className?: string;
};

const Arrow = ({ className = "" }: Props) => {
  return (
    <svg
      width="110"
      height="90"
      viewBox="0 0 110 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`hand-arrow ${className}`}
    >
      <path
        d="
      M 10 16
      C 70 8, 95 32, 70 54
      C 56 66, 53 68, 53 70
    "
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
        fill="none"
        transform="translate(-0.6, 0.3)"
      />

      <path
        d="
      M 10 16
      C 70 8, 95 32, 70 54
      C 56 66, 53 68, 53 70
    "
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <path
        d="
      M 48 72
      C 51 76, 54 78, 56 80
      C 57 78, 58 75, 59 72
    "
        stroke="currentColor"
        strokeWidth="3.6"
        opacity="0.45"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(-0.4, 0.4)"
      />

      <path
        d="
      M 49 73
      C 51 77, 53 79, 55 81
      C 57 78, 59 75, 61 71
    "
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default Arrow;
