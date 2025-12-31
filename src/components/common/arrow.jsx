const Arrow = ({ className = "" }) => {
  return (
    <svg
      width="110"
      height="90"
      viewBox="0 0 110 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="hand-arrow"
      className={className}
    >
      <path
        d="
      M 10 16
      C 70 8, 95 32, 70 54
      C 56 66, 53 68, 53 70
    "
        stroke="currentColor"
        stroke-width="3.6"
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />

      <path
        d="
      M 48 72
      C 51 76, 54 78, 56 80
      C 57 78, 58 75, 59 72
    "
        stroke="currentColor"
        stroke-width="3.6"
        opacity="0.45"
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-width="2.3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default Arrow;
