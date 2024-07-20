import { useState } from "react";
import axios from "axios";

const configuration = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
};

// Construir prompt para el usuario como: "dame 10 lugares turisticos interesantes en Encarnacion"
function construirPrompt() {
  const contexto = `
        Devuelve un array de lugares, cada lugar debe tener el siguiente formato JSON:
        
            {
                "key": "Nombre del lugar",
                "type": "El tipo del lugar. Categorias: Turístico, Comida, Desayunos y meriendas, Alojamiento, Tecnología, Compras, Otros",
                "description": "Una descripción con un texto devuelto por el chat-bot explicando por qué el lugar fue incluido en la lista",
                "address": "Dirección del lugar",
                "location": { "lat":-27.3306, "lng": -55.8667}
                "img": "A image of the place"
            }
        
       
    `;
  return contexto;
}

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setResponse("");
  };

  const handleSendMessage = async () => {
    try {
      const prompt = construirPrompt(message);
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente que proporciona listas de lugares en formato JSON según las categorías proporcionadas.",
            },
            {
              role: "system",
              content:
                "La respuesta siempre debe ser un array en la propiedad places",
            },
            {
              role: "system",
              content: prompt,
            },
            {
              role: "user",
              content: message,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      console.log(result.data.choices[0].message.content);
      setResponse(result.data.choices[0].message.content); // Asigna directamente el contenido generado
      props.getResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 border rounded">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message here"
      />
      <button onClick={handleSendMessage}>Send</button>
      <p>Estos son los lugares que te recomiendo</p>
    </div>
  );
};

export default Chat;
