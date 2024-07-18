import logo from '../utils/logo.svg';
import AuthComponent from './login';

function Home() {
    return (
      <>
        <header>
          <img src={logo} className="App-logo" alt="logo" height="32px" />
        </header>
        <AuthComponent></AuthComponent>
      </>
   )
}
export default Home;