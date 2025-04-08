function CloudUpload({ size = 120, color = "#215273" }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.5 19A6.5 6.5 0 0 0 17.5 6h-1.8A8 8 0 1 0 4 14.9" />
        <path d="M12 12v9" />
        <path d="m16 16-4-4-4 4" />
      </svg>
    )
  }
  
  export default CloudUpload
  