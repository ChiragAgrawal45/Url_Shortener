import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { getApps } from './utils/helper'
import { ContextProvider } from './contextApi/ContextApi'   // ✅ ADD THIS

function App() {

  const CurrentApp = getApps();

  return (
    <ContextProvider>   {/* ✅ WRAP WHOLE APP */}
      <Router>
        <CurrentApp />
      </Router>
    </ContextProvider>
  )
}

export default App