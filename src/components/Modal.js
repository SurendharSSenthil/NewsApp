import React from "react";
import { options } from "../options";
import './Modal.css';

export const Modal = ({ search_val, setSearchVal, country, setCountry, fetchNews, onClose }) => { 
    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setCountry(selectedCountry);
        setSearchVal("");
        onClose();
        fetchNews();
    };
    
    return(
        <div className="flex items-center justify-center w-[100vw] h-[100vh] fixed top-0 left-0">
            <div>
                <div className="bg-blue-800 flex flex-col justify-evenly items-center p-[20px] m-4 gap-2 rounded-2xl">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-white font-semibold text-xl ">Get news based on the Countries</h2>
                        <button className="bg-orange-500 p-3 text-white rounded-xl m-4" onClick={onClose}>close</button> {/* Button to close the modal */}
                    </div>
                    <select 
                        className="p-2 text-slate-800 border-slate-300 rounded-lg mb-4"
                        value={country}
                        onChange={handleCountryChange}
                    >
                        <option value="">Select Country</option>
                        {Object.entries(options).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
