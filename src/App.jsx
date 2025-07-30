import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import StepCreate from './pages/StepCreate'
import StepSortNumber from './pages/StepSortNumber'
import About from './pages/About'
import NotFound from './pages/NotFound'
import './styles/App.css'
import './styles/index.css'

function App() {
  return (
    <div className="p-4">
      {/* <nav className="space-x-4 mb-4">
        <Link to="/step-create">Create Step</Link>
        <Link to="/step-sort-number">Sort Step</Link>
        <Link to="/about">About</Link>
      </nav> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<StepCreate />} />
        {/* <Route path="/step-sort-number" element={<StepSortNumber />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}

export default App