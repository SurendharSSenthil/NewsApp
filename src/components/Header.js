import React, { useState } from "react";
import "./Header.css"; 

export const Header = ({ setCountry, setGenre, setLoading, fetchNews, search_val, setSearchVal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleGenreClick = (genre) => {
        setGenre(genre);
        setSearchVal("");
        setIsMenuOpen(false);
        fetchNews();
    };

    const handleSubmit = () => {
        setGenre("");
        fetchNews();
    }

    return (
        <nav className={`navbar bg-blue-900 flex flex-row justify-evenly align-middle ${isMenuOpen ? "full-width" : ''}`}>
            {/* Hamburger menu button */}
            <div className="flag">
                <button 
                    className={`hamburger ${isMenuOpen ? "open":""}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>

                {/* Menu items */}
                <ul className={`menu ${isMenuOpen ? "clear" : ""}  text-white font-semibold`}>
                    <li className="navbar_item" onClick={() => handleGenreClick("general")}>General</li>
                    <li className="navbar_item" onClick={() => handleGenreClick("business")}>Business</li>
                    <li className="navbar_item" onClick={() => handleGenreClick("health")}>Health</li>
                    <li className="navbar_item" onClick={() => handleGenreClick("science")}>Science</li>
                    <li className="navbar_item" onClick={() => handleGenreClick("sports")}>Sports</li>
                    <li className="navbar_item" onClick={() => handleGenreClick("technology")}>Technology</li>
                </ul>
            </div>
            <div className={`flex flex-row justify-evenly gap-4 p-4 ${isMenuOpen ? "remove":""}`}>
                <input 
                    type="text" 
                    placeholder="Enter the word to search" 
                    className="bg-white text-slate-700 border-gray-700 rounded-lg lg:p-4 md:p-4 p-2"
                    aria-label="Search"
                    value={search_val}
                    onChange={(e)=>setSearchVal(e.target.value)}
                />
                <button 
                    className="bg-orange-500 text-white font-semibold md:py-2 md:px-4 border-white rounded hover:scale-105 transition duration-500 ease-in-out p-2"
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </div>
        </nav>
    );  
};
