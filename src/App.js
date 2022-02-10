import logo from './logo.svg';
import {Container,Navbar} from "react-bootstrap"
import SearchPage from './components/SearchPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" variant="dark" bg="dark" fixed="top">
        <Container>
          <Navbar.Brand> <h2>Weather Forecast 🌤 </h2></Navbar.Brand>
        </Container>
      </Navbar>
      <SearchPage></SearchPage>
    </div>
  );
}

export default App;
