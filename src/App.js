import logo from './logo.svg';
import './App.css';


// Define a function to generate a random number between min (inclusive) and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a new Date object representing today's date
const today = new Date();

// Create a new Date object representing one year ago from today
const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

// Initialize an empty object to store the random numbers for each day of the year
const commitsPerDate = {};

function generateFakeCommitData() {
  for (let date = new Date(oneYearAgo); date <= today; date.setDate(date.getDate() + 1)) {
    // Format the date as a string in yyyy-mm-dd format
    const dateString = date.toISOString().substring(0, 10);

    // Generate a random number between 0 and 100
    const randomNumber = getRandomNumber(0, 100);

    // Add the random number to the object with the date as the key
    commitsPerDate[dateString] = randomNumber;
  }
}

function App() {
  generateFakeCommitData();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer" 
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
