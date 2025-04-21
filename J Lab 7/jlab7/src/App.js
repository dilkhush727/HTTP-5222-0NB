import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Menu from './components/Menu';

import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Menu />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
