import { useState } from 'react'
import MapComponent from './components/Map.jsx'
import Chat from './components/ChatBot.jsx';

const App = () => {
  let [places, setPlaces] = useState([]);

  return (
    <>
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className='flex w-full space-x-4 max-w-7xl mx-auto'> 
        <div className="w-1/2 p-4 bg-blue-500 text-white"> 
          <MapComponent locations={places}/>
        </div>
        <div className="w-1/2 p-4 bg-gray-400 text-black">
        <Chat/> 
        </div>
      </div>
    </div>
  </>
  
  );
};

export default App;