/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FontIcon,
  Nav,
  Persona,
  PersonaPresence,
  PersonaSize,
  Stack,
  css,
  initializeIcons,
  mergeStyles,
} from "@fluentui/react";
import React, { useEffect, useRef, useState } from "react";
import { LocalStorage, getChatObjectMetadata, requestHandler } from "../Utils";
import {
  createUserChat,
  getAvailableUsers,
  getChatMessages,
  getUserChats,
  sendMessage,
} from "../Api";
import { UserInterface } from "../Interfaces/user";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import { useAuth } from "../Context/AuthContext";
import { useSocket } from "../Context/SocketContext";
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from "../Interfaces/chat";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const Sidebar = ({ fetchAgain }: any) => {
  const { user } = useAuth();
  const { setSelectedChat, chats, setChats, groups, setGroups } = ChatState();
  const currentChat = useRef<ChatListItemInterface | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<ChatMessageInterface[]>(
    []
  ); // To track unread messages

  //new setup
  const navigate = useNavigate();

  const fetchChats = async () => {
    requestHandler(
      async () => await getUserChats(),
      null,
      (res) => {
        const { data } = res;
        setChats(data.filter((i: ChatListItemInterface) => !i.isGroupChat));
        setGroups(data.filter((i: ChatListItemInterface) => i.isGroupChat));
      },
      alert
    );
  };

  const getChats = async (userId: any) => {
    requestHandler(
      async () => await getUserChats(),
      null,
      (res) => {
        const { data } = res;
        const cht = data.filter((ch: ChatListItemInterface) => {
          if (ch.participants.find((p: any) => p._id === userId)) {
            return ch;
          }
        });
        setSelectedChat(cht[0]);
        LocalStorage.set("currentChat", cht[0]);
        navigate(`/Client/Capsitech/${cht[0]?._id}`);
        setChats(data || []);
      },
      alert
    );
  };

  React.useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Stack
      className={mergeStyles({
        backgroundColor: "#E6E8F8",
        width: 255,
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      })}
      tokens={{ childrenGap: 10 }}
    >
      <Stack style={{ padding: 8 }} tokens={{ childrenGap: 5 }}>
        <Stack horizontal horizontalAlign="space-between">
          <label
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#171717",
              marginLeft: 2,
            }}
          >
            Direct Message
          </label>
        </Stack>
        <div>
          <SearchUserInput
            placeholder="Search people, groups, messages"
            onChange={async (newValue: any) => {
              // if user is creating normal chat just get a single user
              await requestHandler(
                // Callback to create a user chat
                async () => await createUserChat(newValue.value),
                null, // Callback to handle loading state
                // Success callback
                (res) => {
                  const { data } = res; // Extract data from response
                  // If chat already exists with the selected user
                  if (res.statusCode === 200) {
                    setSelectedChat(data);
                    LocalStorage.set("currentChat", data);
                    navigate(`/Client/Capsitech/${data?._id}`);
                    return;
                  }
                  getChats(newValue.value);
                  // Execute the onSuccess function with received data
                },
                alert // Use the alert as the error handler
              );
            }}
            style={{ width: 210 }}
          />
        </div>
      </Stack>
      <Stack style={{ marginTop: 0 }}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{ padding: "0px 10px" }}
        >
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#171717",
              marginLeft: 2,
              marginBottom: 8,
            }}
          >
            Direct Messages
          </label>
        </Stack>
        {chats &&
          chats.map((chat: ChatListItemInterface) => {
            return (
              <>
                <div
                  onClick={() => {
                    if (
                      currentChat.current?._id &&
                      currentChat.current?._id === chat?._id
                    )
                      return;
                    LocalStorage.set("currentChat", chat);
                    currentChat.current = chat;
                    setSelectedChat(chat);
                    navigate(`/Client/Capsitech/${chat?._id}`);
                  }}
                  className={mergeStyles({
                    display: "flex",
                    textDecoration: "none",
                    color: "#4d4d66",
                    textAlign: "start",
                    padding: "8px 0px",
                    alignItems: "center",
                    gap: 7,
                    height: 25,
                    border: "none",
                    flexDirection: "row",
                    width: "100%",
                    ":hover": {
                      backgroundColor: "#FFFFFF",
                      //   selectors: {
                      //     div: {
                      //       display: "block",
                      //     },
                      //   },
                    },
                  })}
                >
                  <div
                    className={mergeStyles({
                      display: "flex",
                      fontSize: 13,
                      marginLeft: 15,
                      width: 25,
                    })}
                  >
                    <Persona
                      presence={
                        chat._id === currentChat.current?._id
                          ? PersonaPresence.online
                          : PersonaPresence.offline
                      }
                      imageUrl={getChatObjectMetadata(chat, user!).avatar ?? ""}
                      size={PersonaSize.size24}
                      title={getChatObjectMetadata(chat, user!).title}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      cursor: "default",
                      display: "flex",
                      flexDirection: "column",
                      width: "80%",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <span
                        style={{
                          width: "100%",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          display: "flex",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {getChatObjectMetadata(chat, user!).title}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {getChatObjectMetadata(chat, user!).lastMessage && (
                        <span
                          style={{
                            fontSize: 12,
                            width: 100,
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {getChatObjectMetadata(chat, user!).lastMessage}
                        </span>
                      )}
                      {unreadMessages.filter((n) => n.chat === chat._id)
                        .length <= 0 ? null : (
                        <span>
                          {unreadMessages.filter((n) => n.chat === chat._id)
                            .length > 9
                            ? "9+"
                            : unreadMessages.filter((n) => n.chat === chat._id)
                                .length}
                        </span>
                      )}
                      <span style={{ fontSize: 7, marginRight: 10 }}>
                        {moment(chat.updatedAt)
                          .add("TIME_ZONE", "hours")
                          .fromNow(true)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{ padding: "0px 10px" }}
        >
          <label
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#171717",
              marginLeft: 2,
            }}
          >
            Groups
          </label>
          <FontIcon
            iconName="ChevronDown"
            style={{
              marginTop: 6,
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 700,
            }}
            className={mergeStyles({
              ":hover": {
                color: "#5342be",
              },
            })}
            onClick={() => {}}
          />
        </Stack>
        {groups &&
          groups.map((group: any) => {
            return (
              <>
                <div
                  onClick={() => {
                    if (
                      currentChat.current?._id &&
                      currentChat.current?._id === group?._id
                    )
                      return;
                    LocalStorage.set("currentChat", group);
                    currentChat.current = group;
                    // getMessages();
                    setSelectedChat(group);
                    navigate(`/Client/Capsitech/${group?._id}`);
                  }}
                  className={mergeStyles({
                    display: "flex",
                    textDecoration: "none",
                    color: "#4d4d66",
                    textAlign: "start",
                    padding: "8px 0px",
                    alignItems: "center",
                    gap: 7,
                    height: 25,
                    border: "none",
                    flexDirection: "row",
                    width: "100%",
                    ":hover": {
                      backgroundColor: "#FFFFFF",
                      //   selectors: {
                      //     div: {
                      //       display: "block",
                      //     },
                      //   },
                    },
                  })}
                >
                  <div
                    className={mergeStyles({
                      display: "flex",
                      fontSize: 13,
                      marginLeft: 15,
                      width: 25,
                    })}
                  >
                    <Persona
                      imageUrl={group.pic ?? ""}
                      size={PersonaSize.size24}
                      title={group.name}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      cursor: "default",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <span
                        style={{
                          width: "100%",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          display: "flex",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {group.name}
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {/* <span>
                        {getChatObjectMetadata(chat, user!).lastMessage}
                      </span>
                      {unreadMessages.filter((n) => n.chat === chat._id)
                        .length <= 0 ? null : (
                        <span>
                          {unreadMessages.filter((n) => n.chat === chat._id)
                            .length > 9
                            ? "9+"
                            : unreadMessages.filter((n) => n.chat === chat._id)
                                .length}
                        </span>
                      )} */}
                      <span style={{ fontSize: 7 }}>
                        {moment(group.updatedAt)
                          .add("TIME_ZONE", "hours")
                          .fromNow(true)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        <div
          className={mergeStyles({
            display: "flex",
            textDecoration: "none",
            color: "#4d4d66",
            textAlign: "start",
            padding: "10px 15px",
            alignItems: "center",
            gap: 7,
            height: 35,
            flexDirection: "row",
            width: "100%",
          })}
          onClick={() => {}}
        >
          <span
            style={{
              width: 110,
              fontWeight: 500,
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "inline-block",
              whiteSpace: "nowrap",
              cursor: "default",
              fontSize: 13,
            }}
          >
            {/* <PlusOutlined />  */}
            Create Group
          </span>
        </div>
      </Stack>
    </Stack>
  );
};

export default Sidebar;

export const SidePanel = () => {
  initializeIcons();
  const Items = ["test", "test2", "test3"];
  return (
    // <Nav groups={links} selectedKey="key1" styles={navigationStyles as any} />
    <div
      className={mergeStyles({
        backgroundColor: "#838CD8",
        width: 46,
        height: "100dvh",
        padding: "0px 3px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      })}
    >
      <Stack tokens={{ childrenGap: 4 }}>
        <div
          className={mergeStyles({
            margin: "10px 5px 3px 5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            ":hover > .active": {
              display: "block",
            },
          })}
        >
          <div
            className={css(
              "active",
              mergeStyles({
                backgroundColor: "#5342BE",
                width: 8,
                height: 32,
                marginLeft: -10,
                marginRight: 5,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                display: "none",
              })
            )}
          />
          <div
            style={{
              backgroundColor: "#5342BE",
              height: 34,
              width: 34,
              borderRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontIcon iconName="msg" style={{ marginTop: 8 }} />
          </div>
        </div>
        <hr style={{ width: 30, color: "#C0C0C0" }} />
        {Items.map((_itm: any) => (
          <>
            <div
              className={mergeStyles({
                margin: "10px 5px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                ":hover > .active": {
                  display: "block",
                },
              })}
            >
              <div
                className={css(
                  "active",
                  mergeStyles({
                    backgroundColor: "#5342BE",
                    width: 8,
                    height: 32,
                    marginLeft: -10,
                    marginRight: 5,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    display: "none",
                  })
                )}
              />
              <Persona
                imageInitials="VR"
                size={PersonaSize.size32}
                presence={PersonaPresence.online}
              />
            </div>
          </>
        ))}
        <div
          className={mergeStyles({
            margin: "10px 5px 3px 5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            ":hover > .active": {
              display: "block",
            },
          })}
        >
          <div
            className={css(
              "active",
              mergeStyles({
                backgroundColor: "#5342BE",
                width: 8,
                height: 32,
                marginLeft: -10,
                marginRight: 5,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                display: "none",
              })
            )}
          />
          <div
            style={{
              backgroundColor: "#FFF",
              height: 34,
              width: 34,
              borderRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontIcon iconName="Add" />
          </div>
        </div>
      </Stack>
      <Stack
        tokens={{ childrenGap: 10 }}
        style={{ display: "flex", alignItems: "center" }}
      >
        <FontIcon iconName="notifications" style={{ cursor: "pointer" }} />
        <FontIcon iconName="setting" style={{ cursor: "pointer" }} />
        <div
          style={{
            marginLeft: 15,
            cursor: "pointer",
          }}
        >
          <Persona imageInitials="VR" size={PersonaSize.size32} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FontIcon iconName="wings" />
          <label style={{ marginTop: -6, fontSize: 14, color: "#fff" }}>
            Wings
          </label>
        </div>
      </Stack>
    </div>
  );
};

export const SearchUserInput = ({ onChange, value, placeholder }: any) => {
  // const { setSelectedChat, user, chats, setChats } = ChatState();

  const _loadSuggestions = (query: string, callback: any) => {
    requestHandler(
      // Callback to fetch available users
      async () => await getAvailableUsers(query),
      null, // No loading setter callback provided
      // Success callback
      (res) => {
        if (res.data) {
          const opt = res.data.map((r: any) => {
            return {
              label: r.username,
              value: r._id,
              email: r.email,
              pic: r.pic,
            };
          });
          callback(opt); // Set users data or an empty array if data is absent
        } else {
          callback([]); // Set users data or an empty array if data is absent
        }
      },
      alert // Use the alert as the error handler
    );
    // AxiosService.get(`/api/user?search=${query}`, user.token)
    //   .then((res: any) => {
    //     if (res.result) {
    //       const opt = res.result.map((r: any) => {
    //         return {
    //           label: r.name,
    //           value: r._id,
    //           email: r.email,
    //           pic: r.pic,
    //         };
    //       });
    //       callback(opt);
    //     } else {
    //       callback([]);
    //     }
    //   })
    //   .catch((error: any) => {
    //     callback([]);
    //     console.error("Failed to Load the Search Results");
    //   });
  };

  const loadSuggestions = debounce(_loadSuggestions, 300);

  return (
    // <Select
    //   showSearch
    //   status={status}
    //   labelInValue
    //   filterOption={true}
    //   onSearch={debounceFetcher}
    //   notFoundContent={
    //     fetching ? (
    //       <Spin
    //         size="small"
    //         style={{ justifyContent: "center", display: "flex" }}
    //       />
    //     ) : null
    //   }
    //   {...props}
    //   options={options}
    // />
    <>
      <AsyncSelect
        defaultOptions
        className={mergeStyles({})}
        value={value}
        placeholder={placeholder}
        loadOptions={loadSuggestions}
        onChange={(value: any) => {
          onChange(value);
        }}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            // border: "none",
            borderRadius: 8,
            minHeight: 25,
            fontSize: 12,
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: 12,
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            display: "none",
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            marginTop: 1,
            fontSize: 12,
          }),
          option: (base, props) => ({
            ...base,
            padding: "4px 10px",
            fontSize: 12,
          }),
          loadingIndicator: (base, props) => ({
            ...base,
            display: "none",
          }),
        }}
      />
    </>
  );
};
