import React, { useState, useEffect } from 'react';
import './App.css'; 
import { Content } from './components/Content';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { apiKey } from './fun';
import question from './assets/question.jpg';
import { Modal } from './components/Modal'; // Import the Modal component

function App() {
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("us");
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [search_val, setSearchVal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [error, setError] = useState(null);

  const handleQuestionClick = () => {
    setIsModalOpen(true); // Open the modal when the question button is clicked
  }

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  }

  const fetchNews = async () => {
      setLoading(true);
      let apiUrl = "https://newsapi.org/v2/top-headlines?";
      if(search_val !== ""){
        apiUrl = "https://newsapi.org/v2/everything?"
        apiUrl += `q=${search_val}&${apiKey}`;
      }
      else if (country && genre) {
          apiUrl += `country=${country}&category=${genre}&${apiKey}`;
      } else if (country) {
          apiUrl += `country=${country}&${apiKey}`;
      } else if (genre) {
          apiUrl += `category=${genre}&${apiKey}`;
      } else {
          console.log("No parameters provided");
          return;
      }

      try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
              throw new Error("Failed to fetch news");
          }
          const data = await response.json();
          setNews(data.articles);
          setLoading(false);
      } catch (error) {
          console.error(error);
          setLoading(false);
          setError("Failed to fetch news. Please try again later.");
      }
  }
  
useEffect(() => {
    fetchNews()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <div className={`bg flex flex-col items-center justify-between ${isModalOpen ? 'blur' : ''}`}>
        <Header setCountry={setCountry} setGenre={setGenre} setLoading={setLoading} fetchNews={fetchNews} search_val={search_val} setSearchVal={setSearchVal}/>
        {loading ? <LoadingSpinner /> : <Content genre={genre} news={news} country={country}/>} 
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleQuestionClick}>
          <img src={question} alt='question_tag' className='fixed bottom-[20px] right-[20px] w-[50px] h-[50px] rounded-3xl'/>
        </button>
        <Footer />
      </div>
      {isModalOpen && <Modal search_val={search_val} setSearchVal={setSearchVal} country={country} setCountry={setCountry} fetchNews={fetchNews} onClose={handleCloseModal} />} {/* Render the modal if isModalOpen is true */}
    </div>
  );
}

export default App;
