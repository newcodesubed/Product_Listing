import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/useSearchContext';
import { useNavigate, useLocation } from 'react-router';

export default function CategorySidebar() {
  const { 
    categories, 
    selectedCategory, 
    searchProductsByCategory, 
    clearSearch 
  } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen sizes
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < 768;
      const newIsTablet = width >= 768 && width < 1024;
      
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);
      
      // Auto-close sidebar when switching to desktop from smaller screens
      if (width >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isOpen]);

  const handleCategorySelect = (category) => {
    searchProductsByCategory(category.slug);
    if (location.pathname !== '/search') {
      navigate('/search');
    }
    // Close sidebar after selection on mobile and tablet
    if (isMobile || isTablet) {
      setIsOpen(false);
    }
  };

  const handleClearCategory = () => {
    clearSearch();
    navigate('/');
    if (isMobile || isTablet) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Toggle Button - Mobile and Tablet */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-20 left-4 z-50 bg-white border border-gray-300 rounded-lg p-2 shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Toggle categories menu"
      >
        <div className="w-5 h-5 flex flex-col justify-center items-center">
          <div className={`w-4 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`}></div>
          <div className={`w-4 h-0.5 bg-gray-600 my-0.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-4 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></div>
        </div>
      </button>

      {/* Backdrop for Mobile and Tablet */}
      {(isMobile || isTablet) && isOpen && (
        <div 
          className={`fixed inset-0 z-40 transition-all duration-300 ${
            isMobile 
              ? 'bg-black/50' 
              : 'backdrop-blur-sm bg-gray-900/10'
          }`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        ${(isMobile || isTablet) ? 'fixed' : 'relative'} 
        top-0 left-0 z-50
        w-64 sm:w-72 md:w-80 lg:w-72
        ${(isMobile || isTablet) ? 'bg-white' : 'bg-gray-50'}
        border-r border-gray-200 
        ${(isMobile || isTablet) ? 'h-full' : 'h-auto'}
        overflow-y-auto
        transform transition-all duration-300 ease-in-out
        ${
          (isMobile || isTablet) 
            ? (isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none') 
            : 'translate-x-0 shadow-none'
        }
      `}>
        <div className="p-4 pt-20 lg:pt-4">
          {/* Mobile & Tablet Header */}
          {(isMobile || isTablet) && (
            <div className="lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Categories</h2>
                <button
                  onClick={selectedCategory ? handleClearCategory : () => setIsOpen(false)}
                  className={`text-xl transition-colors ${
                    selectedCategory 
                      ? 'text-blue-600 hover:text-blue-800' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={selectedCategory ? 'Clear selection' : 'Close sidebar'}
                >
                  ✕
                </button>
              </div>
              
              {/* Show selected category info when one is selected */}
              {selectedCategory && (
                <div className="mb-4 pb-4 border-b border-gray-200 bg-blue-50 rounded-lg p-3">
                  <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                    Currently Selected
                  </div>
                  <div className="text-sm text-blue-800 font-semibold mt-1 capitalize">
                    {categories.find(cat => cat.slug === selectedCategory)?.name || selectedCategory}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Tap ✕ to clear selection
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Desktop Header - Only show on desktop when sidebar is always visible */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
            {selectedCategory && (
              <button
                onClick={handleClearCategory}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          {/* Categories List */}
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-3 py-3 lg:py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium capitalize text-base lg:text-sm">{category.name}</div>
                <div className="text-sm lg:text-xs text-gray-500 mt-1">
                  {category.url?.split('/').pop() || category.slug}
                </div>
              </button>
            ))}
          </div>
          
          {/* Loading State */}
          {categories.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-sm">Loading categories...</div>
            </div>
          )}


        </div>
      </aside>
    </>
  );
}