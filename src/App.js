import logo from './logo.svg';
import './App.css';
import New_desk from './components/new_desk/New_desk';
import {createTheme} from '@material-ui/core/styles'





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
    <>
      <New_desk></New_desk>
    </>
  );
}

export default App;
