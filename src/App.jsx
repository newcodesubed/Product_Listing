import React from 'react'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import Search from './pages/Search';
import Nav from './components/nav';
import { SearchProvider } from './context/SearchContext';

export default function App() {
  return (
    <SearchProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </SearchProvider>
  );
}
