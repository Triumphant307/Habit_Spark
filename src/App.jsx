import { BrowserRouter as Router, Routes, Route }  from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Suggestions from "./pages/Suggestions"
import Completed from "./pages/Completed"
import Tracker from "./pages/Tracker"
import BackToTop from "./components/BackToTop"

function App() {


  return (
    <>
    <Router>
    <Header />
    <main>
     <ToastContainer
       position="top-right"
       autoClose={2000}
       hideProgressBar={false}
       closeOnClick={true}
       pauseOnHover={true}
       draggable={true}
       theme="light"
       limit={2}
     />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/suggestions" element={<Suggestions/>} />
        <Route path="/completed" element={<Completed/>} />
        <Route path="/tracker" element={<Tracker/>} />
      </Routes>
    </main>
    
    <Footer />
    <BackToTop />
    </Router>
    </>
  )
}

export default App
