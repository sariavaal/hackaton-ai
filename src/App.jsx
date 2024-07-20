import { useState } from 'react'
import MapComponent from './components/Map.jsx'
import Card from './components/Card.jsx';
import { Description, Field, Label,Input, Dialog} from '@headlessui/react';
import LoaderModal from './components/LoaderModal.jsx';
import ChatBot from './components/ChatBot.jsx';

//import Main from './components/pages/Main.jsx';
const App = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  let [places, setPlaces] = useState( []);
  

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleLoading = (loadingStatus) => {
    setLoading(loadingStatus);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      console.log('Mensaje enviado:', input);
      // logica para ernviar el mensaje
      setInput(''); 
    }
  };

  const getResponse = (response) => {
    console.log(response);
    try {
      const parsedResponse = JSON.parse(response);
      if (Array.isArray(parsedResponse)) {
        setPlaces(parsedResponse);
      } else {
        console.error('La respuesta no es un array:', parsedResponse);
        // Manejar el caso cuando la respuesta no es un array, por ejemplo:
        // setPlaces([]);
      }
    } catch (error) {
      console.error('Error al parsear la respuesta JSON:', error);
      // Manejar el error, por ejemplo:
      // setPlaces([]);
    }
  };
  return (
    <>
      <div className="w-screen max-h-12 m-0 p-3 bg-indigo-500 flex items-center justify-center py-16">
        <h1 className="title-font text-3xl font-extrabold tracking-tight sm:text-4xl mr-4 text-white ">Descubriendo Encarnación</h1>
        <div className="text-center w-20">
          <LoaderModal isOpen={loading}/>
        </div>
        <ChatBot getResponse={getResponse} handleLoading={handleLoading}/>
      </div>
     <div className="w-50 h-50">
           <MapComponent locations={places} />
      </div>
      <h1 className="title-font text-4xl text-indigo-500 font-bold mb-4 text-center m-10">Tendencias</h1>
      <div className='flex items-center'>
      {places && places.map(place => (
        <Card
          key={place.key}  
          nombre={place.key} 
          tipo={place.type}
          direccion={place.address}
          descripcion={place.description}
        />
      ))}
    </div>
    </>
  );
};

export default App;