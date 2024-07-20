import { useState } from 'react';
import axios from 'axios';

const configuration = {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
};

// Construir prompt para el usuario como: "dame 10 lugares turisticos interesantes en Encarnacion"
function construirPrompt(usuarioPrompt) {
    const contexto = `
        Devuelve una lista de lugares en el siguiente formato JSON:
        [
            {
                "key": "Nombre del lugar",
                "type": "El tipo del lugar. Categorias: Turístico, Comida, Desayunos y meriendas, Alojamiento, Tecnología, Compras, Otros",
                "description": "Una descripción con un texto devuelto por el chat-bot explicando por qué el lugar fue incluido en la lista",
                "address": "Dirección del lugar",
                "location": { "lat":-27.3306, "lng": -55.8667}
            },
            ...
        ]
        Prompt del usuario: ${usuarioPrompt}
    `;
    return contexto;
}

const Chat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        setResponse('');
    }

    const handleSendMessage = async () => {
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
            const jsonResponse = JSON.parse(result.data.choices[0].message.content);
            const formattedResponse = JSON.stringify(jsonResponse, null, 2);
            setResponse(formattedResponse);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <div>
            <input type="text" value={message} onChange={handleInputChange} placeholder="Type your message here" />
            <button onClick={handleSendMessage}>Send</button>
            <p><strong>You:</strong> {message}</p>
            {response && <p><strong>Chatbot:</strong> {response}</p>}
        </div>
    );
}

export default Chat;
