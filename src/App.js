import './App.css';
import Basic from './components/basic';
import Advanced from './components/advanced';

// Initialize an empty object to store the random numbers for each day of the year
var commitsPerDate = [];

function generateFakeCommitData() {
  for (let month = 0; month < 12; month++) {
    // Get the number of days in the current month
    const numberOfDays = new Date(2023, month + 1, 0).getDate();

    // Loop through each day of the current month
    for (let day = 1; day <= numberOfDays; day++) {
      // Create a new Date object for the current day
      const currentDate = new Date(2023, month, day, 5); // hack: added 5 hours to avoid midnight

      // Generate a random number between 0 and 100
      const randomNumber = Math.floor(Math.random() * 100);

      console.log(currentDate.toJSON().substring(0, 10))

      // Add a new object to the array
      commitsPerDate.push({
        date: currentDate.toJSON().substring(0, 10),
        count: randomNumber
      });
    }
  }
}

function App() {
  generateFakeCommitData();

  return (
    <div className="App">
      <header className="App-header">
        Heatmaps library for React showdown
      </header>
      <Basic commitsData={commitsPerDate} />
      <Advanced commitsData={commitsPerDate} />
    </div>
  );
}

export default App;
