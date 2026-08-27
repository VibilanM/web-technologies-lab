import "./App.css";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AboutConference from "./components/AboutConference";
import ImportantDates from "./components/ImportantDates";
import Speakers from "./components/Speakers";
import Schedule from "./components/Schedule";
import Registration from "./components/Registration";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Navigation />

      <main>
        <Hero />
        <AboutConference />
        <ImportantDates />
        <Speakers />
        <Schedule />
        <Registration />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;