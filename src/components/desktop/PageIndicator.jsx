"use client"

import React from "react"

function PageIndicator({ totalPages, currentPage, onPageChange }) {
  const getPageItems = () => {
    const pages = [];
    const maxVisible = 5;
    const ellipsis = <span className="px-1 text-white/50">...</span>;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(renderButton(i));
      }
      return pages;
    }

    pages.push(renderButton(0)); // always show first

    if (currentPage > 2) {
      pages.push(ellipsis);
    }

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(renderButton(i));
    }

    if (currentPage < totalPages - 3) {
      pages.push(ellipsis);
    }

    pages.push(renderButton(totalPages - 1)); // always show last

    return pages;
  };

  const renderButton = (index) => (
    <button
      key={index}
      className={`w-3 h-3 rounded-full transition-all ${
        currentPage === index ? "bg-white" : "bg-white/30"
      }`}
      onClick={() => onPageChange(index)}
      aria-label={`Go to page ${index + 1}`}
      aria-current={currentPage === index ? "page" : undefined}
    />
  );

  return (
    <div className="relative z-10 flex items-center justify-center gap-2 my-8">
      {getPageItems()}
    </div>
  )
}

export default PageIndicator
