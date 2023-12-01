import React, { useState } from 'react';
import './App.css'; 

const CountryInfo = ({ country }) => {
  const [isTranslationsOpen, setIsTranslationsOpen] = useState(false);
  const renderValue = (key, value) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return <div className="nested-info">{renderObject(value)}</div>;
    } else if (Array.isArray(value)) {
      return value.join(', ');
    } else {
      return value.toString();
    }
  };
  const toggleTranslations = () => {
    setIsTranslationsOpen(!isTranslationsOpen);
  };


  const renderObject = (object) => {
    return Object.entries(object).map(([subKey, subValue]) => {
      if (typeof subValue === 'object' && !Array.isArray(subValue)) {
        return (
          <div key={subKey}>
            <strong>{subKey.charAt(0).toUpperCase() + subKey.slice(1)}:</strong> {renderObject(subValue)}
          </div>
        );
      } else {
        return (
          <span key={subKey}>
            {subKey.charAt(0).toUpperCase() + subKey.slice(1)}: {subValue.toString()}<br />
          </span>
        );
      }
    });
  };

  return (
    <div className="country-info">
      {Object.entries(country).map(([key, value]) => {
        if (key === 'flags' || key === 'coatOfArms') {
          return (
            <div key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
              <br />
              <img src={value.png} alt={key} style={{ maxWidth: '200px', display: 'block', margin: '10px 0' }} />
            </div>
          );
        }

        if (key === 'translations') {
          return (
            <div key={key}>
              <strong onClick={toggleTranslations}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {isTranslationsOpen ? '(Hide Details)' : '(Show Details)'}
              </strong>
              {isTranslationsOpen && <div className="country-info-content">{renderValue(key, value)}</div>}
            </div>
          );
        }

        return (
          <div key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {renderValue(key, value)}
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const [countryName, setCountryName] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleInputChange = (e) => {
    setCountryName(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); 
  
    try {
      const response = await fetch(`https://coding-challenge-bounce-insights-backend.vercel.app/country/${countryName}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Country not found. Please try a different name.');
        }
        throw new Error(`There was a problem fetching the country data . ${response.status}`);
      }
      const data = await response.json();
      setCountryInfo(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setCountryInfo(null);
    } finally {
      setLoading(false); 
    }
  };


  return (
    <div className="app-container">
      <h1>Country Information Finder</h1>
      <form className="search-box" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={countryName}
          onChange={handleInputChange}
          placeholder="Enter a country name"
          className="search-input"
        />
        <button type="submit" className="search-button">Get Country Info</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && countryInfo && countryInfo.length > 0 && <CountryInfo country={countryInfo[0]} />}
    </div>
  );
}

export default App;
