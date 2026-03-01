import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LocationAdvantage from './components/LocationAdvantage';
import InteractivePlotMap from './components/InteractivePlotMap';
import InvestmentHighlights from './components/InvestmentHighlights';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CallbackForm from './components/CallbackForm';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import FloatingButtons from './components/FloatingButtons';

/**
 * quaantumm Ventures - Premium Real Estate Website
 * A premium gated plotting community at the heart of Tirupati.
 */
function App() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <Hero />
        <LocationAdvantage />
        <InteractivePlotMap />
        <InvestmentHighlights />
        <About />
        <Testimonials />
        <FAQ />
        <CallbackForm />
      </main>
      <Footer />
      <FloatingButtons />

      {/* Balaji-inspired subtle watermark */}
      <div className="balaji-watermark" />
    </>
  );
}

export default App;
