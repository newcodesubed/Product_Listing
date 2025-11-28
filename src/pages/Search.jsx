import React from 'react'

import ProductCard from '../components/productCard'
import { useSearch } from '../context/useSearchContext';

export default function Search() {
    const { searchResults, isSearching, searchQuery, selectedCategory, categories } = useSearch();

    const getCategoryDisplayName = () => {
        if (!selectedCategory) return null;
        const category = categories.find(cat => cat.slug === selectedCategory);
        return category ? category.name : selectedCategory;
    };

    const categoryName = getCategoryDisplayName();

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {categoryName ? (
                            `${categoryName} Products`
                        ) : searchQuery ? (
                            `Search Results for "${searchQuery}"`
                        ) : (
                            'Search Results'
                        )}
                    </h1>
                    {!isSearching && searchResults.length > 0 && (
                        <p className="text-gray-600 mt-2">
                            Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {isSearching ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Searching...</span>
                    </div>
                ) : (
                    <div>
                        {searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {searchResults.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : searchQuery ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-500">
                                    Try searching with different keywords
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Start searching
                                </h3>
                                <p className="text-gray-500">
                                    Enter a product name in the search bar above
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}