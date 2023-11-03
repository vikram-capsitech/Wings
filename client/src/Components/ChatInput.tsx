import React, { useState } from "react";
import {
  FontIcon,
  IconButton,
  Stack,
  TextField,
  mergeStyles,
} from "@fluentui/react";
import { CColors, CStyles } from "../Common/CStyles";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

interface ChatInputProps {
  handleSendMsg: any;
  value: any;
  onChange: (e: any, value: any) => void;
  handleFile: (file: any) => void;
}

const ChatInput = ({
  handleSendMsg,
  value,
  onChange,
  handleFile,
}: ChatInputProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const hiddenFileInput = React.useRef<any>(null);
  const [attachments, setAttachments] = useState<File>();

  const handleEmojiClick = (e: any) => {
    let message = msg;
    message += e?.emoji;
    setMsg(message);
    onChange(e, message);
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (e: any) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg, attachments);
      setMsg("");
    }
  };

  React.useEffect(() => {
    setMsg(value);
  }, [value]);

  const content = (
    <EmojiPicker
      onEmojiClick={handleEmojiClick}
      autoFocusSearch={false}
      emojiStyle={EmojiStyle.APPLE}
    />
  );

  const getFileType = (fileName: any) => {
    let type = "";
    const extension = fileName?.type?.split("/")[1];

    switch (extension) {
      case "pdf":
        type = "PDF";
        break;
      case "docx":
      case "doc":
        type = "WordDocument";
        break;
      case "xls":
      case "xlsx":
        type = "ExcelDocument";
        break;
      case "mp4":
      case "mov":
        type = "MSNVideos";
        break;
      case "zip":
      case "7z":
      case "rar":
        type = "ZipFolder";
        break;
      case "jpg":
      case "jpeg":
      case "png":
        type = "Photo2";
        break;
      default:
        type = "alt";
    }

    return type;
  };

  return (
    <>
      <Stack>
        <TextField
          multiline
          rows={3}
          style={{
            width: "75vw",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: 40,
          }}
          resizable={false}
          className={CStyles.input}
          placeholder="Enter a message.."
          value={msg}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendChat(e);
              setAttachments(undefined);
            }
          }}
          onChange={(e, value) => {
            setMsg(value!);
            onChange(e, undefined);
          }}
        />
        <Stack
          style={{
            background: CColors.lighterGray,
            padding: "5px 10px",
            display: attachments && attachments.name ? "flex" : "none",
            flexDirection: "row",
          }}
        >
          {attachments && attachments.name && (
            <Stack
              className={mergeStyles({
                width: "auto",
                height: 45,
                background: "#dceaffd9",
                borderRadius: 8,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                padding: 9,
                ":hover": {
                  selectors: {
                    div: {
                      display: "block !important",
                    },
                  },
                },
              })}
            >
              <div
                className="remove"
                style={{
                  display: "none",
                  position: "absolute",
                  right: -5,
                  top: -10,
                }}
              >
                <IconButton
                  onClick={() => {
                    setAttachments(undefined);
                  }}
                  iconProps={{ iconName: "Cancel", style: { fontSize: 10 } }}
                  style={{
                    backgroundColor: "#ffdcdc",
                    borderRadius: 50,
                    height: 16,
                    width: 16,
                  }}
                />
              </div>
              <Stack
                horizontal
                tokens={{ childrenGap: 8 }}
                style={{ alignItems: "baseline" }}
              >
                <FontIcon
                  iconName={`${getFileType(attachments)}`}
                  style={{ fontSize: 18 }}
                />
                <label>{attachments.name}</label>
              </Stack>
            </Stack>
          )}
        </Stack>
        <Stack
          horizontal
          style={{
            width: "100%",
            alignItems: "center",
            height: 33,
            backgroundColor: CColors.backgroundBlue,
            justifyContent: "space-between",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <div>
            <FontIcon
              iconName="Attach"
              onClick={() => {
                hiddenFileInput.current?.click();
                // setShowEmojiPicker(!showEmojiPicker);
              }}
              style={{
                cursor: "pointer",
                fontSize: 15,
                padding: 10,
              }}
            />
            <input
              hidden
              id="attachments"
              type="file"
              value=""
              multiple
              max={5}
              onChange={(e) => {
                if (e.target.files) {
                  const fileUploaded = e.target.files[0];
                  setAttachments(fileUploaded);
                  handleFile(fileUploaded);
                }
              }}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
            <label style={{ fontSize: 15, cursor: "pointer" }}>😇</label>
          </div>
          <div>
            <FontIcon
              iconName="Send"
              style={{
                fontSize: 15,
                width: 35,
                height: 2,
                color: msg ? CColors.green : CColors.disableGray,
                cursor: "pointer",
              }}
              onClick={(e) => {
                sendChat(e);
                setAttachments(undefined);
              }}
            />
            {/* <img
              width="40"
              height="35"
              src="https://img.icons8.com/sf-black-filled/64/000000/paper-plane.png"
              alt="paper-plane"
              style={{
                marginTop: 5,
                backgroundColor: msg
                  ? CColors.selectBlue
                  : CColors.backgroundBlue,
                cursor: "pointer",
              }}
              
            /> */}
          </div>
        </Stack>
      </Stack>
    </>
  );
};
export default ChatInput;
