import { useState } from "react";
import MapComponent from "./components/Map.jsx";
import Card from "./components/Card.jsx";
import LoaderModal from "./components/LoaderModal.jsx";
import ChatBot from "./components/ChatBot.jsx";

const App = () => {
  const [input, setInput] = useState(""); // Estado para manejar el input del usuario
  const [places, setPlaces] = useState([]); // Estado para almacenar los lugares

  // Maneja los cambios en el input del usuario
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      console.log("Mensaje enviado:", input);
      // Aquí puedes agregar la lógica para enviar el mensaje al chatbot
      setInput("");
    }
  };

  // Maneja la respuesta del chatbot
  const getResponse = (response) => {
    console.log(response);
    try {
      const parsedResponse = JSON.parse(response);
      const arrayResponse = parsedResponse.places;
      if (Array.isArray(arrayResponse)) {
        setPlaces(arrayResponse);
      } else {
        console.error("La respuesta no es un array:", arrayResponse);
        setPlaces([]);
      }
    } catch (error) {
      console.error("Error al parsear la respuesta JSON:", error);
      setPlaces([]);
    }
  };

  return (
    <>
      <div className="w-screen m-0 p-3 bg-slate-500 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">MAPAS</h1>
          <LoaderModal />
        </div>
      </div>
      <div>
        <ChatBot getResponse={getResponse} />
      </div>
      <MapComponent locations={places} />
      <h1 className="text-4xl font-bold mb-4 text-center">RESULTADOS</h1>
      <div className="flex items-center flex-wrap">
        {places.length > 0 ? (
          places.map((place) => (
            <Card
              key={place.key}
              nombre={place.key}
              tipo={place.type}
              direccion={place.address}
              descripcion={place.description}
            />
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </>
  );
};

export default App;
