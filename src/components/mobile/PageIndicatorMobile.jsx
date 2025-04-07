import React from "react"

export default function PageIndicatorMobile({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="absolute bottom-[60px] left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4 z-10">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all ${currentPage === index ? "bg-white" : "bg-white/30"}`}
          onClick={() => onPageChange(index)}
          aria-label={`Go to page ${index + 1}`}
          aria-current={currentPage === index ? "page" : undefined}
        />
      ))}
    </div>
  )
}

