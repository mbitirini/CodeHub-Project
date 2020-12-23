//import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AddCourse from "./components/AddCourse";
import AppNavigation from "./components/AppNavigation";
import Courses from "./components/Courses";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CourseDetails from "./components/CourseDetails";
import EditCourse from "./components/EditCourse";

import { Route, Switch } from "react-router-dom"
import ScrollRestoration from 'react-scroll-restoration'

function App() {
  return (
    <main>
       <AppNavigation />
       <ScrollRestoration />
       <Switch>
         <Route path="/" component={Dashboard} exact />
         <Route path="/courses" component={Courses} />
         <Route path="/addnewcourse" component={AddCourse} />
         <Route path="/coursedetails" component={CourseDetails} />
         <Route path="/editcourse" component={EditCourse} />
         <Route component={Error} />
       </Switch>
    </main>
  );
}

export default App;