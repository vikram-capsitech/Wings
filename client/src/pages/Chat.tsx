import "../App.css";
import "../../node_modules/@fluentui/react/dist/css/fabric.css";
import SideHeader from "../Components/SideHeader";
import Sidebar from "../Components/SideBar";
import { useRef, useState } from "react";
import { ChatListItemInterface } from "../Interfaces/chat";
import { Icon, Stack } from "@fluentui/react";
import { CColors } from "../Common/CStyles";
import ChatPannel from "../Components/ChatPannel";
import React from "react";
import { ChatState } from "../Context/ChatProvider";

const Chat = () => {
  const currentChat = useRef<ChatListItemInterface | null>(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat } = ChatState();

  React.useEffect(() => {
    const value: any = JSON.parse(localStorage.getItem("currentChat") as any);
    if (value) currentChat.current = value;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm-1" style={{ padding: 0 }}>
            <SideHeader />
          </div>
          <div
            className="ms-Grid-col ms-sm-2 ms-xl2"
            style={{ paddingLeft: 0 }}
          >
            <Sidebar fetchAgain={fetchAgain} />
          </div>
          <Stack style={{ height: "100dvh" }}>
            {selectedChat ? (
              <>
                <ChatPannel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  showDetail={() => {
                    // setShowDetail({ show: !showDetail.show, type: value });
                  }}
                />
              </>
            ) : (
              <Stack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Icon
                  iconName="AddFriend"
                  style={{ fontSize: "50px", color: CColors.CadetGray }}
                />
                <label>Click on a user to start chatting</label>
              </Stack>
            )}
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Chat;

// export const UserDetailComponent = ({ type, onClose, isOpen }: any) => {
//   const [receiver, setReceiver] = React.useState<any>();
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const { clientId } = useParams();
//   const { user } = ChatState();
//   React.useEffect(() => {
//     setLoading(true);
//     debugger;
//     const getUserDetail = async () => {
//       await AxiosService.get(
//         type === "group"
//           ? `/api/chat/group/${clientId}`
//           : `/api/user/${clientId}`,
//         user.token
//       )
//         .then((res: any) => {
//           if (res.result) {
//             setReceiver(res.result);
//             setLoading(false);
//           }
//         })
//         .catch((error: any) => {
//           console.error(error.message);
//           setLoading(false);
//           toast.error("Error in fetching the details");
//         });
//     };
//     getUserDetail();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [clientId, user.token]);

//   return (
//     <>
//       {!loading && (
//         <>
//           <Drawer
//             title={`Details`}
//             placement="right"
//             onClose={onClose}
//             open={isOpen}
//           >
//             <Space
//               direction="vertical"
//               style={{ alignItems: "center", width: "100%" }}
//             >
//               <Image
//                 width={110}
//                 src={`${receiver?.pic}`}
//                 style={{ borderRadius: "50%", marginTop: "50%" }}
//               />
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   marginTop: "10%",
//                 }}
//               >
//                 {type === "group" ? (
//                   <>
//                     <label
//                       style={{ lineHeight: 1, fontWeight: 500, fontSize: 20 }}
//                     >
//                       {receiver?.chatName}
//                     </label>
//                   </>
//                 ) : (
//                   <>
//                     <label
//                       style={{ lineHeight: 1, fontWeight: 500, fontSize: 20 }}
//                     >
//                       {receiver?.name}
//                     </label>
//                     <label style={{ lineHeight: 2, color: CColors.CadetGray }}>
//                       {receiver?.email}
//                     </label>
//                   </>
//                 )}
//                 <Space direction="vertical">
//                   {type === "group" &&
//                     receiver?.users?.map((member: any, index: number) => {
//                       return (
//                         <>
//                           <div
//                             className={mergeStyles({
//                               display: "flex",
//                               textDecoration: "none",
//                               color: "#4d4d66",
//                               textAlign: "start",
//                               alignItems: "center",
//                               gap: 7,
//                               flexDirection: "row",
//                               width: "100%",
//                             })}
//                           >
//                             <div
//                               className={mergeStyles({
//                                 display: "flex",
//                                 fontSize: 15,
//                               })}
//                             >
//                               <Badge
//                                 dot={true}
//                                 size="default"
//                                 status="success"
//                                 style={{
//                                   top: 25,
//                                   left: 19,
//                                   width: 9,
//                                   height: 9,
//                                   minHeight: 9,
//                                 }}
//                               >
//                                 <Avatar
//                                   src={
//                                     <img src={`${member.pic}`} alt="avatar" />
//                                   }
//                                 >
//                                   {member.name}
//                                 </Avatar>
//                               </Badge>
//                             </div>
//                             <div
//                               style={{
//                                 fontSize: 15,
//                                 cursor: "default",
//                                 display: "flex",
//                                 flexDirection: "column",
//                               }}
//                             >
//                               <span
//                                 title={member.name}
//                                 style={{
//                                   width: 150,
//                                   textOverflow: "ellipsis",
//                                   overflow: "hidden",
//                                   display: "flex",
//                                   whiteSpace: "nowrap",
//                                 }}
//                               >
//                                 {member.name}
//                               </span>
//                               {member._id === receiver.owner._id && (
//                                 <>
//                                   <span
//                                     style={{
//                                       border: `1px solid ${CColors.green}`,
//                                       width: "fit-content",
//                                       padding: "1px 2px",
//                                       borderRadius: 5,
//                                       fontSize: 12,
//                                       textOverflow: "ellipsis",
//                                       overflow: "hidden",
//                                       display: "flex",
//                                       whiteSpace: "nowrap",
//                                       color: CColors.white,
//                                       background: CColors.green,
//                                     }}
//                                   >
//                                     Admin
//                                   </span>
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                         </>
//                       );
//                     })}
//                 </Space>

//                 <Space style={{ marginTop: 20 }}>
//                   <Button type="default" icon={<AudioTwoTone />}>
//                     Voice chat
//                   </Button>
//                   <Button type="default" icon={<VideoCameraTwoTone />}>
//                     Video Chat
//                   </Button>
//                 </Space>
//               </div>
//               <div style={{ marginTop: "10%" }}>
//                 <div
//                   className={mergeStyles({
//                     width: 250,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: 7,
//                     borderRadius: 8,
//                     cursor: "pointer",
//                     selectors: {
//                       ":hover": {
//                         backgroundColor: "#f5f5f5",
//                       },
//                     },
//                   })}
//                 >
//                   <span>Search in Conversation</span>
//                   <SearchOutlined style={{ marginRight: 10 }} />
//                 </div>
//                 <div
//                   className={mergeStyles({
//                     width: 250,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: 7,
//                     borderRadius: 8,
//                     cursor: "pointer",
//                     selectors: {
//                       ":hover": {
//                         backgroundColor: "#f5f5f5",
//                       },
//                     },
//                   })}
//                 >
//                   <span>Change Color</span>
//                   <BgColorsOutlined style={{ marginRight: 10 }} />
//                 </div>
//                 <div
//                   className={mergeStyles({
//                     width: 250,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: 7,
//                     borderRadius: 8,
//                     cursor: "pointer",
//                     selectors: {
//                       ":hover": {
//                         backgroundColor: "#f5f5f5",
//                       },
//                     },
//                   })}
//                 >
//                   <span>Links</span>
//                   <PaperClipOutlined style={{ marginRight: 10 }} />
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   marginTop: "10%",
//                 }}
//               >
//                 <div>
//                   <FolderTwoTone style={{ fontSize: 15 }} />
//                   <label
//                     style={{ fontSize: 12, marginLeft: 5, color: "#4096ff" }}
//                   >
//                     Shared photos
//                   </label>
//                 </div>
//                 <div
//                   style={{
//                     width: 250,
//                     height: 150,
//                     padding: 0,
//                     border: `1px solid ${CColors.CadetGray}`,
//                     borderRadius: 8,
//                     cursor: "pointer",
//                   }}
//                 >
//                   <Empty description="No photos" />
//                 </div>
//                 <Button type="default" style={{ border: "none" }}>
//                   View More
//                 </Button>
//               </div>
//             </Space>
//           </Drawer>
//         </>
//       )}
//     </>
//   );
// };
