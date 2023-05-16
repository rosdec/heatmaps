import './App.css';
import Basic from './components/basic';
import Heatmap from './components/advanced';

// Define a function to generate a random number between min (inclusive) and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a new Date object representing today's date
const today = new Date();
 
// Create a new Date object representing one year ago from today
const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

// Initialize an empty object to store the random numbers for each day of the year
var commitsPerDate = [];

function generateFakeCommitData() {
  for (let date = new Date(oneYearAgo); date <= today; date.setDate(date.getDate() + 1)) {
    // Format the date as a string in yyyy-mm-dd format
    const dateString = date.toISOString().substring(0, 10);

    // Generate a random number between 0 and 100
    const randomNumber = getRandomNumber(0, 100);

    // Add the random number to the object with the date as the key
    commitsPerDate.push({date:dateString.split('/').join('-'), count: randomNumber});
  }
}

function App() {
  generateFakeCommitData();

  return (
    <div className="App">
      <header className="App-header">
        Heatmaps library for React showdown
      </header>
      <Basic commitsData = { commitsPerDate }></Basic>
      <Heatmap data={[4, 8, 15, 16, 23, 42, 10, 20, 30, 40, 50, 60]} />
    </div>
  );
}

export default App;
