import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { connect } from "react-redux";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import API_URL from "@/url";

const ChatArea = ({ user }) => {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatSocket, setChatSocket] = useState(null);
  const [resData, setResData] = useState(null);
  const [rend, setRend] = useState(0);
  const [prevOffset, setPrevOffset] = useState(0);
  const [reachedTop, setReachedTop] = useState(false);
  const [limit, setLimit] = useState(100);
  let namey = Math.floor(Math.random() * 1000);

  const scrollableRef = useRef(null);

  useEffect(() => {
    enterRoom("discussion");
  }, []);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  useEffect(() => {
    if (resData && rend % 2 == 0) {
      setMessages((prevMessages) => {
        const newMessages = resData.results.map((data) => {
          return { message: data.message, username: data.user };
        });
        return [...newMessages, ...prevMessages];
      });
    }
    setRend((prev) => prev + 1);
  }, [resData]);

  const fetchMessages = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `${API_URL}/ws/api/messages/discussion/?limit=1&offset=0`,
          config
        );
        const data = res.data;
        let offset = data.count - limit;
        try {
          const response = await axios.get(
            `${API_URL}/ws/api/messages/discussion/?limit=${data.count}&offset=0`,
            config
          );
          const responseData = response.data;
          setResData(responseData);
          setPrevOffset(offset - limit);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("invalid token");
    }
  };

  const fetchPrevMessages = async (offset, lmt) => {
    if (offset < 0 && offset > 0 - lmt) {
      lmt = lmt + offset;
      offset = 0;
    } else if (offset <= 0 - lmt) {
      return;
    }
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        const response = await axios.get(
          `${API_URL}/ws/api/messages/discussion/?limit=${lmt}&offset=${offset}`,
          config
        );
        const responseData = response.data;
        setResData(responseData);
        setPrevOffset(offset - limit);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollableRef.current.scrollTop;

      if (scrollTop === 0 && !reachedTop) {
        setReachedTop(true);
        // fetchPrevMessages(prevOffset, limit);
      } else {
        setReachedTop(false);
      }
    };

    scrollableRef.current.addEventListener("scroll", handleScroll);
  }, [reachedTop, prevOffset]);

  function enterRoom(room) {
    setRoom(room);
    connectToWebSocket(room);
  }
  function connectToWebSocket(room) {
    if (chatSocket) {
      chatSocket.close();
    }
    setChatSocket(new WebSocket("ws://localhost:8000/ws/chat/" + room + "/"));
  }
  useEffect(() => {
    if (!chatSocket) {
      return;
    }
    chatSocket.onopen = function (e) {
      console.log("The connection was setup successfully !");
    };
    chatSocket.onclose = function (e) {
      console.log("Something unexpected happened !");
    };
    chatSocket.onerror = function (error) {
      console.error("WebSocket Error:", error);
    };
    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);

      setMessages((prevMessages) => [...prevMessages, data]);
      setMessageInput("");
    };
  }, [chatSocket]);

  function sendMessage(e) {
    e.preventDefault();
    chatSocket.send(
      JSON.stringify({ message: messageInput, username: user.name })
    );
  }
  return (
    <Card className="ml-auto mt-0 bg-gray-100 sm:w-3/4 h-9/10">
      <CardHeader className="bg-blue-100 flex justify-center items-center p-3">
        <MdGroups className="w-8 h-8"/>
      </CardHeader>
      <CardContent className="overflow-auto h-[73vh]" ref={scrollableRef}>
        {messages.map((mes, index) => (
          <div key={index}>
            {mes.username != user.name ? (
              <div className="relative bg-slate-600 p-1 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl mt-3 mr-auto w-3/4 ">
                <div className="absolute w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-slate-600 border-b-[0px] border-b-transparent transform bottom-0 -left-2"></div>
                <p className="px-3 text-blue-500 font-medium">{mes.username}</p>
                <p className="text-slate-200 p-1 px-3 text-lg">{mes.message}</p>
              </div>
            ) : (
              <div className="relative bg-slate-400 p-1 mt-3 w-3/4 ml-auto rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl">
                <div className="absolute w-0 h-0 border-t-[20px] border-t-transparent border-l-[20px] border-slate-400 border-b-[0px] border-b-transparent transform bottom-0 -right-2"></div>
                <p className="text-slate-200 p-1 px-3 text-lg">{mes.message}</p>
              </div>
            )}
            <br />
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-4">
        <form onSubmit={sendMessage} className="w-[100%] flex gap-1">
          <Input
            placeholder="enter your message..."
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
            className="w-[100%]"
          />
          <button type="submit" className="flex align-middle items-center w-8">
            <IoMdSend className="w-6 h-6" />
          </button>
        </form>
      </CardFooter>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ChatArea);
