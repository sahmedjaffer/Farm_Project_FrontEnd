import './App.css'
import axios from 'axios'
import { useEffect , useState } from 'react'
import { BASE_URL } from './globals'
import HotelsList from './components/HotelsList'


const App = () => {
    const [hotels, setHotels] = useState([])
  useEffect(() => {
  const getHotels = async () => {
  const response = await axios.get(`${BASE_URL}/hotel?city_name=manama&arrival_date=2025%2F12%2F12&departure_date=2025%2F12%2F20&sort_by=price`)
    console.log(response)
    setHotels(response.data)

  }

  getHotels()
}, [])

  return (
    <div>
      <HotelsList hotels={hotels} />
    </div>
  )
}

export default App