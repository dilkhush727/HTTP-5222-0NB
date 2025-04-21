import { useState } from 'react'
import Header from "./components/Header/Header"
import Question from "./components/Question/Question"
import Footer from "./components/Footer/Footer"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Header />
      <main>
      <Question />
      <Footer />
      </main>
    </div>
    </>
  )
}

export default App
