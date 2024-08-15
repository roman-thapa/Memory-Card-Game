import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [data, setData] = useState()

  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
      const data = response.json()
      setData(data)
    }
    fetchData()
  }, [])
  console.log(data)
  return (
    <>
      <h1>Memory card Game</h1>
    </>
  )
}

export default App
