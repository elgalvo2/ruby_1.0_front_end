import logo from './logo.svg';
import './App.css';
import New_desk from './components/new_desk/New_desk';
import Desk from './components/desk/desk'
import {createTheme} from '@material-ui/core/styles'
import MobileDesk from './mobile_components/mobile_desk/MobileDesk';





function App() {



  const theme = createTheme({
    typography :{
      fontFamily:[
        'Zen Kaku Gothic Antique', 
        'sans-serif'
      ].join(','),
    },
  });

  return (
    <>{(window.innerWidth<500)?<MobileDesk/>:<Desk></Desk>}
    </>
  );
}

export default App;
