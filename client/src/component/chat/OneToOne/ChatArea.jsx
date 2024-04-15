import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Message from "../MessageBlock/Message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import API_URL from "@/url";
import { WEBSOCKET_URL } from "@/url";

const ChatArea = ({ user }) => {
  const [activeButton, setActiveButton] = useState(-1);
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatSocket, setChatSocket] = useState(null);
  const [resData, setResData] = useState(null);
  const [rend, setRend] = useState(0);
  const [limit, setLimit] = useState(100);
  const [rooms, setRooms] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userRooms, setUserRooms] = useState([]);
  const [roomsLoaded, setRoomsLoaded] = useState(false);
  const {roomName} = useParams();

  const scrollableRef = useRef(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if(roomName){
      enterRoom(roomName);  
    }
    else{
      enterRoom("discussion");
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    if (user) {
      if (room != "") {
        fetchMessages(room);
        fetchUserData();
      }
    }
  }, [user, room]);

  useEffect(() => {
    if (userData) {
      if (roomsLoaded) {
        return;
      }
      rooms.forEach(async (rum) => {
        const { counselorId, studentId } = extractIds(rum.name);
        if (userData.is_student) {
          if (studentId == user.id) {
            const username = await getUsername(counselorId);
            const newroom = { username: username, room: rum };
            setUserRooms((userRoom) => [...userRoom, newroom]);
          }
        } else {
          if (counselorId == user.id) {
            const username = await getUsername(studentId);
            const newroom = { username: username, room: rum };
            setUserRooms((userRoom) => [...userRoom, newroom]);
          }
        }
      });
      setRoomsLoaded(true);
    }
  }, [userData, rooms]);

  const getUsername = async (id) => {
    try {
      const username = await fetchUserName(id);
      return username;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const fetchUserName = async (id) => {
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
          `${API_URL}/all/users/${id}`,
          config
        );
        return res.data.name;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      console.log("invalid token");
    }
  };

  function extractIds(inputString) {
    const counselorRegex = /c(\d+)/;
    const studentRegex = /s(\d+)/;

    const counselorMatch = inputString.match(counselorRegex);
    const studentMatch = inputString.match(studentRegex);

    const counselorId = counselorMatch ? counselorMatch[1] : null;
    const studentId = studentMatch ? studentMatch[1] : null;

    return { counselorId, studentId };
  }

  const fetchMessages = async (room) => {
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
          `${API_URL}/ws/api/messages/${room}/?limit=1&offset=0`,
          config
        );
        const data = res.data;
        try {
          const response = await axios.get(
            `${API_URL}/ws/api/messages/${room}/?limit=${data.count}&offset=0`,
            config
          );
          const responseData = response.data;
          console.log(responseData);
          setResData(responseData);
        } catch (err) {
          console.log(err);
          setMessages([]);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("invalid token");
    }
  };

  const fetchRooms = async () => {
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
          `${API_URL}/ws/api/rooms/`,
          config
        );
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("invalid token");
    }
  };

  const fetchUserData = async () => {
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
          `${API_URL}/all/users/${user.id}`,
          config
        );
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("invalid token");
    }
  };

  useEffect(() => {
    if (resData) {
      setMessages([]);
      setMessages((prevMessages) => {
        const newMessages = resData.results.map((data) => {
          return {
            message: data.message,
            username: data.user,
            timestamp: data.timestamp,
          };
        });
        return [...newMessages, ...prevMessages];
      });
    }
    setRend((prev) => prev + 1);
  }, [resData]);

  function enterRoom(room) {
    setRoom(room);
    connectToWebSocket(room);
  }
  function connectToWebSocket(room) {
    if (chatSocket) {
      chatSocket.close();
    }
    setChatSocket(new WebSocket(`ws://${WEBSOCKET_URL}/ws/chat/` + room + "/"));
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
  console.log(messages);

  return (
    <div className="flex mb-1">
      <Card className="mx-0 w-full h-[100vh] text-foreground">
        <CardHeader className="bg-secondary text-muted-foreground flex justify-center items-center p-3">
          Chat
        </CardHeader>
        <div className="flex">
          <div className="grow flex flex-col border-r-2">
            <Button
              className={`rounded-none py-7 bg-${activeButton == -1 ? 'accent': 'background'} text-accent-foreground hover:bg-muted-foreground hover:text-muted`}
              onClick={() => {
                enterRoom("discussion");
                setActiveButton(-1);
              }}
            >
              Discussion
            </Button>
            {userRooms.length != 0
              ? userRooms.map((rums, index) => (
                  <Button
                    onClick={() => {
                      enterRoom(rums.room.name);
                      setActiveButton(index);
                    }}
                    className={`rounded-none py-5 px-12 bg-${activeButton === index ? 'accent' : 'background'} text-foreground border-y  hover:bg-accent`}
                  >
                    {rums.username}
                  </Button>
                ))
              : ""}
          </div>
          <div className=" w-full">
            <CardContent className="overflow-auto h-[80vh]" ref={scrollableRef}>
              {messages.map((mes, index) => (
                <div key={index}>
                  {mes.username !== user.name ? (
                    <div className="relative bg-accent p-1 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl mt-3 mr-auto max-w-[50%] ">
                      <div className="absolute w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-accent border-b-[0px] border-b-transparent transform bottom-0 -left-2"></div>
                      <p className="px-3 text-primary font-medium">
                        {mes.username}
                      </p>
                      <p className="text-accent-foreground p-1 px-3 text-md">
                        {mes.message}
                      </p>
                      <p className="text-accent-foreground p-1 px-3 text-xs">
                        {mes.timestamp
                          ? new Date(mes.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                      </p>
                    </div>
                  ) : (
                    <div className="relative bg-muted-foreground p-1 mt-3 max-w-[50%] ml-auto rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl">
                      <div className="absolute w-0 h-0 border-t-[20px] border-t-transparent border-l-[20px] border-muted-foreground border-b-[0px] border-b-transparent transform bottom-0 -right-2"></div>
                      <p className="text-muted p-1 px-3 text-md">
                        {mes.message}
                      </p>
                      <p className="text-muted p-1 px-3 text-xs">
                        {mes.timestamp
                          ? new Date(mes.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className="p-4">
              <form onSubmit={sendMessage} className="w-[100%] flex gap-3">
                <Input
                  placeholder="enter your message..."
                  onChange={(e) => setMessageInput(e.target.value)}
                  value={messageInput}
                  className="w-[100%]"
                />
                <button
                  type="submit"
                  className="flex align-middle items-center w-8"
                >
                  <IoMdSend className="w-6 h-6" />
                </button>
              </form>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ChatArea);
