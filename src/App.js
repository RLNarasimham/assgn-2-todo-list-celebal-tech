import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const appStyle = {
    backgroundColor: theme === 'dark' ? '#6D6C6C' : '#f2f2f2',
    minHeight: '100vh',
    color: theme === 'dark' ? '#FF0303' : '#000000',
    padding: '20px',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    marginBottom: '20px',
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: theme === 'dark' ? '#1f6feb' : '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <div style={appStyle}>
      <button onClick={toggleTheme} style={buttonStyle}>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <ToDoList theme={theme} />
    </div>
  );
}

export default App;
