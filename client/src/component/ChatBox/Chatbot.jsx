import { useState } from 'react';
import prompt from '../../prompts';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Message from '../chat/MessageBlock/Message';
import { LuSendHorizonal } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { FaRobot } from "react-icons/fa6";
import API_URL from '@/url';
const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: prompt,
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = { role: 'user', content: inputMessage };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    try {
      const response = await fetch(`${API_URL}/chatbot/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
        credentials: 'include',
      });

      const data = await response.json();
      const botResponse = { role: 'assistant', content: data.response };
      const userResponse = {role: 'user', content: data.message}
      setMessages([...messages, userResponse, botResponse]);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <Drawer direction='left'>
    <DrawerTrigger asChild>
      <Button className={cn('bg-primary rounded-full fixed bottom-4 left-4')}>
        <FaRobot/>
      </Button>
      </DrawerTrigger>
    <DrawerContent className={cn(' w-full sm:w-10/12 md:w-1/2 lg:w-2/6 overflow-scroll p-2')}>
    <DrawerHeader >
        <span>
        <DrawerClose className={cn('float-end')}>
            <Button variant="outline"><IoClose/></Button>
        </DrawerClose>
        <DrawerTitle>Welcome to our chatbot</DrawerTitle>
        <DrawerDescription>Your conversation is private</DrawerDescription>
        </span>
        
    </DrawerHeader>

    <div className="chat-container">
        <div className="w-full">
            {messages.map((message, index) => (
                  <Message key={index} sender={message.role === 'user' ? true: false}
                    text={message.content}
                    top={message.role === 'user' ? 'You' : 'AI Chatbot'}
                    />
            ))}
        </div>
      </div>
    <DrawerFooter>
    <form className="flex" onSubmit={handleSubmit}>
        <Input
          required
          type="text"
          className={cn('w-10/12 ')}
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleChange}
        />
        <Button type="submit"><LuSendHorizonal/></Button>
      </form>
    </DrawerFooter>
    </DrawerContent>
</Drawer>

  );
};

export default Chatbot;
