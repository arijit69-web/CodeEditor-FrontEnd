import axios from 'axios';
import './App.css';
import React, { useState } from 'react';
import logo from './BackGround.jpg'; // Ensure your logo is added to the src folder

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [userInput, setUserInput] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      languageType: selectedLanguage,
      sourceCode: code,
      userInput: userInput
    };

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/submit`, payload);
      setOutput(data.output);
      console.log(data)
    } catch (err) {
      console.log(err.response);
      setOutput("Error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="CodingArrow Logo" className="logo" />
          <h1 className="app-name">CodingArrow</h1>
        </div>
        <div className="header-controls">
          <button className="run-button" onClick={handleSubmit}>Run</button>
          <select value={selectedLanguage} onChange={handleLanguageChange} className="language-select">
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
      </div>
      <div className="container">
        <div className="editor-container">
          <textarea
            className="code-editor"
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="20"
          ></textarea>
        </div>
        <div className="io-container">
          <div className="tabs">
            <button className="tab-button">STDIN</button>
          </div>
          <div className="input-container">
            <textarea
              className="input-editor"
              placeholder="Your Input Goes Here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </div>
          <div className="output-container">
            <h4>Output:</h4>
            {isLoading ? (
              <div className="loading-spinner">
                <img src={logo} alt="Loading..." className="spinner" />
              </div>
            ) : (
              <div className="output" dangerouslySetInnerHTML={{ __html: output.replace(/\n/g, '<br/>') }}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
