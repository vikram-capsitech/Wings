import React, { useState } from "react";
import moment from "moment";
import {
  FontIcon,
  IconButton,
  Persona,
  PersonaSize,
  Stack,
} from "@fluentui/react";
import { useAuth } from "../Context/AuthContext";
import ReactSimpleImageViewer from "react-simple-image-viewer";

const ScrollableChat = ({ messages }: any) => {
  const { user } = useAuth();
  const scrollRef = React.useRef<any>();
  const [resizedImage, setResizedImage] = useState<string | null>(null);

  React.useEffect(() => {
    if (scrollRef)
      (scrollRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }, [scrollRef, messages]);

  return (
    <Stack style={{ maxHeight: "65dvh" }} tokens={{ childrenGap: 10 }}>
      {resizedImage ? (
        <ReactSimpleImageViewer
          src={[resizedImage]}
          currentIndex={0}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          onClose={() => setResizedImage(null)}
        />
      ) : null}
      {messages &&
        messages.toReversed().map((message: any) => {
          return (
            <div
              style={{
                display: "flex",
                padding: "0px 10px",
                alignItems: "flex-end",
                width: "100%",
                justifyContent: "flex-start",
                flexDirection:
                  message.sender?._id !== user?._id ? "row" : "row-reverse",
              }}
              key={message._id}
            >
              <Persona
                styles={{ root: { width: 35 } }}
                imageUrl={message.sender.pic}
                size={PersonaSize.size24}
                title={message.sender.username}
              />
              <div
                style={{
                  // marginTop: isSameUser(messages, m, i) ? 2 : 2,
                  marginTop: 2,
                  borderRadius: 5,
                  cursor: "pointer",
                  maxWidth: "75%",
                  overflow: "auto",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  marginRight: message.sender?._id === user?._id ? 10 : 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <div style={{ marginRight: 10, fontSize: 10 }}>
                    {message.sender?._id === user?._id
                      ? "You"
                      : message.sender?.username}
                  </div>
                  <div style={{ fontSize: 9, color: "#9b9b9b" }}>
                    {moment(message.createdAt)
                      .add("TIME_ZONE", "hours")
                      .fromNow(true)}{" "}
                    ago
                  </div>
                </div>
                <div
                  style={{
                    maxWidth: "100%",
                    padding: "5px 11px 5px 11px",
                    borderRadius: 4,
                    backgroundColor: `${
                      message.sender?._id === user?._id ? "#d8ebf4" : "#B9F5D0"
                    }`,
                    height: "auto",
                    fontSize: 15,
                  }}
                >
                  {message?.attachments?.length > 0 ? (
                    <div>
                      {message.attachments?.map((file: any) => {
                        return (
                          <div
                            key={file._id}
                            style={{
                              position: "relative",
                              width: "180px",
                              height: "180px",
                              padding:10
                            }}
                          >
                            <Stack
                              style={{
                                zIndex: 1,
                                background: "#f3f4f85e",
                                width: "91.9%",
                                height: "91.9%",
                                position: "absolute",
                                top: 6,
                                left: 7,
                                borderRadius: 7,
                                padding: 20,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <IconButton
                                iconProps={{ iconName: "ImageSearch" }}
                                onClick={() => setResizedImage(file.url)}
                              />
                            </Stack>
                            {file.url.includes(".pdf") ? (
                              <Stack>
                                <FontIcon iconName="pdf" />
                              </Stack>
                            ) : (
                              <img
                                src={file.url}
                                height={180}
                                width={180}
                                alt={file.extension}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
      <div ref={scrollRef} />
    </Stack>
  );
};

export default ScrollableChat;
