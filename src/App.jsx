import { BrowserRouter as Router, Routes, Route }  from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Suggestions from "./pages/Suggestions"
import Completed from "./pages/Completed"
import BackToTop from "./components/BackToTop"

function App() {


  return (
    <>
    <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/suggestions" element={<Suggestions/>} />
        <Route path="/completed" element={<Completed/>} />
      </Routes>
    </main>
    
    <Footer />
    <BackToTop />
    </Router>
    </>
  )
}

export default App
