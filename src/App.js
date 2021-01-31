import React from 'react';
import { Switch,Route } from 'react-router-dom/cjs/react-router-dom.min';
import Navigation from './components/Navigation/Navigation';
import Footer from "./components/Footer/Footer";
import Home from './containers/Home/Home';
import AboutUs from './containers/AboutUs/AboutUs';
import Classes from './containers/Classes/Classes';

function App() {

  return (
   <div className="">
   <Navigation />
      
     {/* <Footer /> */}
     <Switch>
        <Route path="/contact-us">Contact us</Route>
        {/* <Route path="/announcements"><Announcement name="ahmed"/></Route> */}
        <Route path="/classes"><Classes/></Route>
        <Route path="/about-us"><AboutUs/></Route>
       <Route path="/">
         <Home />
       </Route>
     </Switch>
     <Footer/>
   </div>
  );
}
export default App;
