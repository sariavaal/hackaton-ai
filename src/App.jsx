import { useState } from 'react'
import MapComponent from './components/Map.jsx'
import Card from './components/Card.jsx';
import { Description, Field, Label,Input, Dialog} from '@headlessui/react';
import LoaderModal from './components/LoaderModal.jsx';
import ChatBot from './components/ChatBot.jsx';

//import Main from './components/pages/Main.jsx';
const App = () => {
  const [response, setResponse] = useState('');
  
  let [places, setPlaces] = useState( []);
  

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      console.log('Mensaje enviado:', inputValue);
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
      <div className="w-screen m-0 p-3 bg-slate-500 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">MAPAS</h1>
          <LoaderModal/>
          </div>
        </div>
      <div>
      <ChatBot getResponse={getResponse}/>
      </div>
      <MapComponent locations={places} />
      <h1 className="text-4xl font-bold mb-4 text-center">RESULTADOS</h1>
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