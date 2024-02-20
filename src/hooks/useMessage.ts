import { Client } from "@stomp/stompjs";
import { ChatDetailType } from "../types/chat";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChatDetail } from "../apis/ChatApi";
import { useReissueToken } from "./useCommon";

export const useMessage = () => {
  const { chatId } = useParams();
  const { getReissueToken } = useReissueToken();
  const [content, setContent] = useState<string>("");
  const [chatDetailValue, setChatDetailValue] = useState<ChatDetailType>({
    id: 0,
    currentUserId: 0,
    person: null,
    messages: [],
  });
  const [client, setClient] = useState<Client | null>(null);

  const connect = () => {
    if (client === null || client.connected === false) {
      const clientData = new Client({
        brokerURL: import.meta.env.VITE_WEBSOCKET_HOST,
        connectHeaders: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        onStompError: (frame) => {
          console.error("Stomp Error:", frame);
        },
        onWebSocketClose: () => {
          console.log("WebSocket closed");
        },
        debug: (str) => {
          console.log(str);
        },
      });
      clientData.onConnect = function () {
        try {
          clientData.subscribe(
            `/sub/chat/${chatId}`,
            (message) => {
              const newMessage = JSON.parse(message.body);
              console.log(newMessage);
              setChatDetailValue((prev) => ({
                ...prev,
                messages: [...prev.messages, newMessage],
              }));
            },
            {
              Authorization: `${localStorage.getItem("accessToken")}`,
            }
          );
        } catch (err: any) {
          if (err.response.status === 403) {
            getReissueToken(`/chat/${chatId}`);
          }
        }
      };
      clientData.activate();
      setClient(clientData);
    }
  };
  const sendMessage = () => {
    const message = {
      chatId: chatId,
      content: content,
      currentUserId: chatDetailValue.currentUserId,
    };
    if (content === "") return;
    try {
      client?.publish({
        destination: `/pub/message`,
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(message),
      });
      setContent("");
    } catch (err: any) {
      if (err.response.status === 403) {
        getReissueToken(`/chat/${chatId}`);
      }
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  useEffect(() => {
    if (chatId) {
      getChatDetail(Number(chatId))
        .then((res) => {
          setChatDetailValue(res.data);
          connect();
        })
        .catch((err) => {
          if (err.response.status === 403) {
            getReissueToken(`/chat/${chatId}`);
          }
        });
    }
    return () => {
      client?.deactivate();
    };
  }, [chatId]);
  return { chatDetailValue, sendMessage, handleInput, content };
};
