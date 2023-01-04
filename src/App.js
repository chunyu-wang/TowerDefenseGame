import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserInfoProvider } from './container/hook/useUserInfo';
import { GameDataProvider } from './container/hook/useGameData';

import Battle from './container/battle'
import Login from './container/login'
import HomePage from './container/homePage';
import StageSelect from './container/stageSelect';
import Troop from './container/troop';
import FourZeroFour from './container/404';
import Backpack from './container/backpack';
import Gotcha from './container/gotcha';


function App() {
  return (
    <UserInfoProvider>
    <GameDataProvider>
    <Router>
      <Routes>
        {/* <Route path='/*' element={<Navigate to="/404" />}/> */}
        <Route path='/*' element={<Navigate to="/Login"/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/Gotcha' element={<Gotcha/>}/>
        <Route exact path='/HomePage' element={<HomePage/>}/>
        <Route exact path='/StageSelect' element={<StageSelect/>}/>
        <Route exact path='/Battle' element={<Battle/>}/>
        <Route exact path='/Troop' element={<Troop/>}/>
        <Route exact path='/Backpack' element={<Backpack/>}/>
        <Route exact path='/404' element={<FourZeroFour/>}/>
        {/* <Route element={<FourZeroFour/>}/> */}
      </Routes>
    </Router>
    </GameDataProvider>
    </UserInfoProvider>
  );
}

export default App;
