import React, { useState, useCallback, useEffect } from 'react';
import { SearchContext } from './useSearchContext';

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getCategories = useCallback(async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/categories`);
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.error('Category fetch error:', err);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);


  const searchProducts = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSelectedCategory(''); 

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const searchProductsByCategory = useCallback(async (category) => {
    if (!category) return;

    setIsSearching(true);
    setSearchQuery(''); 
    setSelectedCategory(category);

    try {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch (error) {
      console.error('Category search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchQuery('');
    setSelectedCategory('');
  }, []);

  const value = {
    searchResults,
    isSearching,
    searchQuery,
    setSearchQuery,
    searchProducts,
    clearSearch,
    categories,
    selectedCategory,
    searchProductsByCategory,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
