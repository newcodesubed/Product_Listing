import React, { useEffect } from 'react'
import ProductCard from '../components/productCard'
import { useSearch } from '../context/useSearchContext';

export default function Search() {
    const { 
        searchResults, 
        isSearching, 
        loadingMore,
        searchQuery, 
        selectedCategory, 
        categories,
        loadMoreResults,
        hasMoreResults,
        searchTotal
    } = useSearch();

    const getCategoryDisplayName = () => {
        if (!selectedCategory) return null;
        const category = categories.find(cat => cat.slug === selectedCategory);
        return category ? category.name : selectedCategory;
    };

    const categoryName = getCategoryDisplayName();

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
                !isSearching &&
                !loadingMore &&
                hasMoreResults &&
                searchResults.length > 0
            ) {
                loadMoreResults();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isSearching, loadingMore, hasMoreResults, searchResults.length, loadMoreResults]);

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
                            Showing {searchResults.length} of {searchTotal} result{searchTotal !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {isSearching && searchResults.length === 0 ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Searching...</span>
                    </div>
                ) : (
                    <div>
                        {searchResults.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {searchResults.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                                
                                {loadingMore && (
                                    <div className="flex justify-center items-center py-8 mt-6">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        <span className="ml-3 text-gray-600">Loading more results...</span>
                                    </div>
                                )}
                                
                                {!hasMoreResults && (
                                    <div className="text-center py-8 mt-6">
                                        <p className="text-gray-500">You've seen all results for this search.</p>
                                    </div>
                                )}
                            </>
                        ) : (searchQuery || selectedCategory) ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-500">
                                    {categoryName ? `No products in ${categoryName} category` : 'Try searching with different keywords'}
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Start searching
                                </h3>
                                <p className="text-gray-500">
                                    Enter a product name in the search bar above or select a category
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}