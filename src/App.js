import './App.css';
import Dashboard from './components/Dashboard';
import AddBill from './components/admin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/404.png'} alt="logo" />
        <p>
          Simple webapp to manage utility bills
        </p>
      <a
        className="App-link"
        href="https://github.com/jlulloaa/utilities-website"
        target="_blank"
        rel="noopener noreferrer"
        >
        GitHub Repository
      </a>

      </header>
      <div id="bills">
        <AddBill />
      </div>
    </div>
  );
}

export default App;
