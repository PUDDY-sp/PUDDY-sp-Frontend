import { useEffect } from "react";
import { FooterNav } from "../FooterNav/FooterNav";
import { Header } from "../Header/header";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showHeader: boolean;
  showFooter: boolean;
}

export const Layout = (props: LayoutProps) => {
  const EventSource = EventSourcePolyfill || NativeEventSource;
  useEffect(() => {
    const source = new EventSource(
      `${import.meta.env.VITE_SERVER_HOST}/api/notification/subscribe`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
          Connection: "keep-alive",
          Accept: "text/event-stream",
        },
        heartbeatTimeout: 86400000,
      }
    );
    source?.addEventListener("connect", (e) => {
      console.log(e);
    });
    source?.addEventListener("addAlert", (e) => {
      alert("매칭 신청이 왔습니다.");
      console.log(e);
    });
  }, [props.title]);
  return (
    <div>
      {props.showHeader && <Header title={props.title} />}
      {props.children}
      {props.showFooter && <FooterNav />}
    </div>
  );
};
