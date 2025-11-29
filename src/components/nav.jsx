import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useSearch } from '../context/useSearchContext';

export default function Nav() {
    const { searchProducts, clearSearch, setSearchQuery, isSearching } = useSearch();
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const timeoutRef = useRef(null);
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (value.trim()) {
                searchProducts(value);
                setSearchQuery(value);
                if (location.pathname !== '/search') {
                    navigate('/search');
                }
            } else if (value === '' && location.pathname === '/search') {
                clearSearch();
                navigate('/');
            }
        }, 500);
    };
    
    const handleClearSearch = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        setInputValue('');
        clearSearch();
        if (location.pathname === '/search') {
            navigate('/');
        }
    };
    
    return (
        <div>
            <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b relative z-30">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/')}>Product Listing</h2>
                <div className="relative flex items-center max-w-xs md:max-w-md w-full ml-4">
                    <input 
                        type="text" 
                        value={inputValue} 
                        placeholder='Search products...' 
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {isSearching && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    {inputValue && (
                        <button 
                            onClick={handleClearSearch}  
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </nav>
        </div>
    )
}
