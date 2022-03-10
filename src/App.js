import logo from './logo.svg';
import './App.css';
import New_desk from './components/new_desk/New_desk';
import Desk from './components/desk/desk'
import {createTheme} from '@material-ui/core/styles'
import MobileDesk from './mobile_components/mobile_desk/MobileDesk';
import MobileAppBar from './mobile_components/mobile_app_bar/MobileAppBar';
import TaskCard from './mobile_components/task_card/TaskCard';
import Register_user_formV2 from './components/admin_pages/commons/Register_user_formV2';
import Register_area_form from './components/admin_pages/register_area_form/Register_area_form';
import AreaCard from './components/admin_pages/area_card/Area_card';
import styles from './app.module.css'




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
     {(window.innerWidth<500)?<MobileDesk/>:<Desk className={styles.desk}></Desk>}
    </>
  );
}

export default App;
