import React from "react";
import './Content.css';
import { options } from "../options";

export const Content = ({ news, genre, country }) => {
    return (
        <div className='p-6 mt-6'>
            <h2 className="text-white font-bold text-center mt-10 text-2xl">{genre} <span className="text-orange-500">News</span></h2>
            <h4 className="text-white font-semibold text-center"> Country : <span className="text-orange-500">{options[country]}</span></h4>
            {news && (
                <div className="cards mt-[15px]">
                    {news.map((data, index) => (
                        data.title !== "[Removed]" && (
                            <div className="Card bg-blue-900 text-white font-semibold hover:-translate-y-2 transition duration-500 ease-in-out" key={index}>
                                <a href={data.url} target="_blank" rel="noopener noreferrer">
                                    {data.urlToImage && <img src={data.urlToImage} className="card_img" alt="News" />}
                                    {!data.urlToImage && (
                                        <img src={`https://source.unsplash.com/300x200/?${genre}`} className="card_img" alt="News" />
                                    )}
                                    <h3 className="card_head">{data.title}</h3>
                                </a>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}
