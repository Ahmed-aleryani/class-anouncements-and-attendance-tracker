import React from 'react';
import { Switch,Route } from 'react-router-dom/cjs/react-router-dom.min';
import Navigation from './components/Navigation/Navigation';
import Footer from "./components/Footer/Footer";
import Home from './containers/Home/Home';
import AboutUs from './containers/AboutUs/AboutUs';
import Classes from './containers/Classes/Classes';
import ClassDetails from './containers/Classes/classDetails';
import AnnouncementDetails from './containers/Announcement/AnnouncementDetails';
import AddAnnouncement from './containers/Announcement/AddAnnouncement';

function App() {

  return (
   <div className="">
   <Navigation />
      
     {/* <Footer /> */}
     <Switch>
        <Route path="/join-class">join-class</Route>
        {/* <Route path="/announcements"><Announcement name="ahmed"/></Route> */}
        <Route path="/classes/:classID&:className&:ownerID" render={(props)=>
          <ClassDetails {...props}/>
        }/> 
        <Route path="/classes/:uid/" exact={true} render={(Props)=><Classes {...Props}/>}></Route>
         <Route path="/AnnouncementDetails/:annID&:title&:body&:chatType" render={(props)=>
          <AnnouncementDetails {...props}/>
        }/>
        <Route path="/addAnnouncement/:classID" render={(props)=><AddAnnouncement {...props}/>}></Route>
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
