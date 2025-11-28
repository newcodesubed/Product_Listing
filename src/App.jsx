import React from 'react'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import Search from './pages/Search';
import Nav from './components/nav';
import CategorySidebar from './components/CategorySidebar';
import { SearchProvider } from './context/SearchContext';

export default function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="flex">
          <CategorySidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}
