import { useState } from 'react';
import axios from 'axios';

const configuration = {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
};

// Construir prompt para el usuario como: "dame 10 lugares turisticos interesantes en Encarnacion"
function construirPrompt(usuarioPrompt) {
    const contexto = `
        Devuelve una lista de lugares en el siguiente formato JSON. Devuelve la respuesta como un array:
        [
            {
                "key": "Nombre del lugar",
                "type": "El tipo del lugar. Categorias: Turístico, Comida, Desayunos y meriendas, Alojamiento, Tecnología, Compras, Otros",
                "description": "Una descripción con un texto devuelto por el chat-bot explicando por qué el lugar fue incluido en la lista",
                "address": "Dirección del lugar",
                "location": { "lat":-27.3306, "lng": -55.8667}
            }
        ]
        Prompt del usuario: ${usuarioPrompt}
    `;
    return contexto;
}

const Chat = (props) => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        setResponse('');
    }

    const handleSendMessage = async () => {
        props.handleLoading(true);
        try {
            const prompt = construirPrompt(message);
            const result = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "Eres un asistente que proporciona listas de lugares en formato JSON según las categorías proporcionadas."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                    }
                }
            );
            console.log(result.data.choices[0].message.content);
            setResponse(result.data.choices[0].message.content); // Asigna directamente el contenido generado
            props.getResponse(result.data.choices[0].message.content);
        } catch (error) {
            console.error('Error sending message:', error);
        }
        props.handleLoading(false);
    }
    /*
    return (
        <div className="flex flex-col p-4 border rounded">
            <input type="text" value={message} onChange={handleInputChange} placeholder="Type your message here" />
            <button onClick={handleSendMessage}>Send</button>
            <p>Estos son los lugares que te recomiendo</p>
        </div>
    );*/
    return (
        <div className="m-10 flex msm:flex-row sm:max-w-lg">
            <input type="text" value={message} onChange={handleInputChange} placeholder="Type your message here"   className="font-sans rounded-md border border-gray-300 px-4 py-2 text-base placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:flex-1"/>
            <button onClick={handleSendMessage} className="mt-3 sm:mt-0 sm:ml-3 rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Send</button>
        </div>
    );
    
}

export default Chat;