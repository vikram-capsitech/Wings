import { mergeStyles } from "@fluentui/merge-styles";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import {
  FontIcon,
  Modal,
  Panel,
  PrimaryButton,
  Stack,
  TextField,
  css,
} from "@fluentui/react";
import { useAuth } from "../Context/AuthContext";
import React from "react";
import { CStyles } from "../Common/CStyles";

const SideHeader = () => {
  const { user } = useAuth();
  const [showDialog, setShowDialog] = React.useState<{
    type: "notification" | "setting" | "user" | "profile" | undefined;
    params: object;
    onDismiss?: (value: any) => void;
  }>({ type: undefined, params: {} });

  return (
    <>
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
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 6,
              borderBottom: "1px solid",
              borderColor: "#a2acff",
              paddingBottom:5
            }}
          >
            <FontIcon iconName="wings" />
            <label style={{ marginTop: -3, fontSize: 14, color: "#fff" }}>
              Wings
            </label>
          </div>
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
              <FontIcon iconName="msg" style={{ marginTop: 2 }} />
            </div>
          </div>
          {/* {Items.map((itm: any) => (
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
          ))} */}
          {/* <div
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
          </div> */}
        </Stack>
        <Stack
          tokens={{ childrenGap: 10 }}
          style={{ display: "flex", alignItems: "center",paddingBottom:6 }}
        >
          <FontIcon
            iconName="notifications"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowDialog({
                type: "notification",
                params: {},
                onDismiss: (value) => {
                  if (!value) setShowDialog({ type: undefined, params: {} });
                },
              });
            }}
          />
          <FontIcon iconName="setting" style={{ cursor: "pointer" }} />
          <div
            style={{
              marginLeft: 15,
              cursor: "pointer",
            }}
            onClick={() => {
              setShowDialog({
                type: "profile",
                params: {},
                onDismiss: (value: any) => {
                  if (!value) setShowDialog({ type: undefined, params: {} });
                },
              });
            }}
          >
            <Persona
              imageUrl={user?.pic}
              imageInitials={user?.username}
              size={PersonaSize.size32}
              title={user?.username}
            />
          </div>
        </Stack>
      </div>
      {showDialog.type === "notification" && (
        <NotificationPanel
          isOpen={showDialog.type === "notification"}
          onDismiss={(value) => {
            showDialog.onDismiss && showDialog.onDismiss(value);
          }}
        />
      )}
      {showDialog.type === "profile" && (
        <EditProfile
          isOpen={showDialog.type === "profile"}
          onClose={(value) => {
            showDialog.onDismiss && showDialog.onDismiss(value);
          }}
        />
      )}
    </>
  );
};

export default SideHeader;

const NotificationPanel = ({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: (value: boolean) => void;
}) => {
  return (
    <>
      <Panel
        headerText="Notifications"
        isOpen={isOpen}
        onDismiss={() => {
          onDismiss(false);
        }}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <p>Work in progress</p>
      </Panel>
    </>
  );
};

const EditProfile = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (value: any) => void;
}) => {
  const inputRef = React.useRef<any>(null);
  const [receiver, setReceiver] = React.useState<any>();

  const postDetails = (pics: any) => {
    if (pics === undefined) {
      alert("Please Select an Image!");
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "yrwqilwz");
      data.append("cloud_name", "resume00");
      fetch("https://api.cloudinary.com/v1_1/resume00/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setReceiver((r: any) => ({ ...r, pic: data?.url?.toString() }));
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please Select an Image!");
      return;
    }
  };

  return (
    <>
      <Modal
        className={CStyles.modal}
        isOpen={isOpen}
        onDismiss={onClose}
        isModeless={true}
      >
        <Stack
          tokens={{ childrenGap: 10 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={receiver?.pic}
            style={{ borderRadius: 50, height: 80, width: 80 }}
          />
          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                postDetails(e.currentTarget.files[0]);
              }
              e.currentTarget.value = "";
            }}
          />
          <FontIcon
            iconName="Edit"
            style={{ border: "none", cursor: "pointer" }}
            onClick={() => {
              inputRef.current.click();
            }}
          />
          <Stack
            verticalFill
            style={{ marginTop: "5%" }}
            tokens={{ childrenGap: 10 }}
          >
            <TextField
              value={receiver?.name}
              className={CStyles.input}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setReceiver((r: any) => ({ ...r, name: value }));
              }}
            />
            <TextField
              value={receiver?.email}
              className={CStyles.input}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setReceiver((r: any) => ({ ...r, email: value }));
              }}
            />
          </Stack>
          <Stack horizontal>
            <PrimaryButton
              className={CStyles.buttonAction}
              text="Close"
              onClick={() => {
                onClose(false);
              }}
            />
            <PrimaryButton className={CStyles.buttonPrimary} text="Save" />
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};
