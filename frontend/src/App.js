import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux';
import store from "./store";

//Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AdminScreen from './screens/AdminScreen';
import BlogScreen from './screens/BlogScreen';
import GalleryScreen from './screens/GalleryScreen';
import ContactScreen from './screens/ContactScreen';
import EditImageScreen from './screens/EditImageScreen';
import EditBlogScreen from './screens/EditBlogScreen';
import BlogPostScreen from './screens/BlogPostScreen';
import NotFoundScreen from './screens/NotFoundScreen';

//components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/gallery' component={GalleryScreen} />
          <Route exact path='/contact' component={ContactScreen} />
          <Route exact path='/admin' component={AdminScreen} />
          <Route exact path='/blog' component={BlogScreen} />
          <Route exact path='/blog/:id' component={BlogPostScreen} />
          <Route exact path='/admin/image/:id/edit' component={EditImageScreen} /> 
          <Route exact path='/admin/blog/:id/edit' component={EditBlogScreen} /> 
          <Route component={NotFoundScreen} />
        </Switch>
        <Footer />
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
