import React from 'react';
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

  const handleCategorySelect = (category) => {
    searchProductsByCategory(category.slug);
    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  const handleClearCategory = () => {
    clearSearch();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          {selectedCategory && (
            <button
              onClick={handleClearCategory}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          )}
        </div>
        
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium capitalize">{category.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {category.url?.split('/').pop() || category.slug}
              </div>
            </button>
          ))}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm">Loading categories...</div>
          </div>
        )}
      </div>
    </aside>
  );
}