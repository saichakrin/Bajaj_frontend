import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      });
      const data = await res.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter(option => option !== value)
        : [...selectedOptions, value]
    );
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

    const filteredData = {};
    if (selectedOptions.includes('Numbers')) {
      filteredData.numbers = numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      filteredData.alphabets = alphabets;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      filteredData.highest_lowercase_alphabet = highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Data Processor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="5"
          cols="50"
          placeholder='Enter JSON, e.g., {"data": ["A", "b", "1", "2"]}'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>

          <div>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest Lowercase Alphabet"
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>

          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
