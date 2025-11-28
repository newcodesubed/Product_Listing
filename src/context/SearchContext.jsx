import React, { useState, useCallback, useEffect } from 'react';
import { SearchContext } from './useSearchContext';

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSkip, setSearchSkip] = useState(0);
  const [searchTotal, setSearchTotal] = useState(0);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const SEARCH_LIMIT = 20;

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


  const searchProducts = useCallback(async (query, isLoadMore = false) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setIsSearching(true);
      setSelectedCategory('');
      setSearchResults([]);
      setSearchSkip(0);
    }

    const currentSkip = isLoadMore ? searchSkip : 0;

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${SEARCH_LIMIT}&skip=${currentSkip}`
      );
      const data = await res.json();
      
      if (isLoadMore) {
        setSearchResults(prev => [...prev, ...data.products]);
      } else {
        setSearchResults(data.products || []);
      }
      
      setSearchTotal(data.total);
      setSearchSkip(currentSkip + SEARCH_LIMIT);
      setHasMoreResults(currentSkip + SEARCH_LIMIT < data.total);
      
    } catch (error) {
      console.error('Search error:', error);
      if (!isLoadMore) setSearchResults([]);
    } finally {
      setIsSearching(false);
      setLoadingMore(false);
    }
  }, [searchSkip, SEARCH_LIMIT]);

  const searchProductsByCategory = useCallback(async (category, isLoadMore = false) => {
    if (!category) return;

    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setIsSearching(true);
      setSearchQuery('');
      setSelectedCategory(category);
      setSearchResults([]);
      setSearchSkip(0);
    }

    const currentSkip = isLoadMore ? searchSkip : 0;

    try {
      const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=${SEARCH_LIMIT}&skip=${currentSkip}`);
      const data = await res.json();
      
      if (isLoadMore) {
        setSearchResults(prev => [...prev, ...data.products]);
      } else {
        setSearchResults(data.products || []);
      }
      
      setSearchTotal(data.total);
      setSearchSkip(currentSkip + SEARCH_LIMIT);
      setHasMoreResults(currentSkip + SEARCH_LIMIT < data.total);
      
    } catch (error) {
      console.error('Category search error:', error);
      if (!isLoadMore) setSearchResults([]);
    } finally {
      setIsSearching(false);
      setLoadingMore(false);
    }
  }, [searchSkip, SEARCH_LIMIT]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchQuery('');
    setSelectedCategory('');
    setSearchSkip(0);
    setSearchTotal(0);
    setHasMoreResults(true);
  }, []);

  const loadMoreResults = useCallback(() => {
    if (searchQuery) {
      searchProducts(searchQuery, true);
    } else if (selectedCategory) {
      searchProductsByCategory(selectedCategory, true);
    }
  }, [searchQuery, selectedCategory, searchProducts, searchProductsByCategory]);

  const value = {
    searchResults,
    isSearching,
    loadingMore,
    searchQuery,
    setSearchQuery,
    searchProducts,
    clearSearch,
    categories,
    selectedCategory,
    searchProductsByCategory,
    loadMoreResults,
    hasMoreResults,
    searchTotal,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
