import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState('default');
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  
  // Load chat URL from environment variables
  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || '';

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Send request to backend using environment variable
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputValue,
          conversation_id: conversationId,
        }),
      });
      
      const data = await response.json();
      
      // Add bot message to chat
      const botMessage: Message = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, botMessage]);
      setConversationId(data.conversation_id);
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message
      const errorMessage: Message = { role: 'system', content: 'Error: Could not get response from server.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle clicks outside the chat component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {isOpen ? (
        <div className="flex flex-col bg-white rounded-lg shadow-xl w-[350px] h-[500px] overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">MedHive Chatbot</h1>
            <button 
              onClick={toggleChat}
              className="text-white hover:bg-blue-700 rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-center text-gray-500">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to MedHive Assistant</h2>
                  <p className="text-lg">Ask me anything about healthcare!</p>
                </div>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div key={index} className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user' 
                  ? 'ml-auto bg-blue-600 text-white rounded-br-sm' 
                  : message.role === 'system'
                    ? 'mx-auto bg-red-100 text-red-700'
                    : 'mr-auto bg-gray-200 text-gray-800 rounded-bl-sm'
              }`}>
                {message.content}
              </div>
            ))}
            
            {isLoading && (
              <div className="max-w-[80%] p-3 rounded-2xl mr-auto bg-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <textarea 
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                rows={1}
                className="flex-1 p-3 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading}
                className="ml-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chat;