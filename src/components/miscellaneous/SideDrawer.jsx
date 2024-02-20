import React, { useState } from "react";
import chatIcons from "./icons/chaticon";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Toast,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/Chatprovider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../config/Chatlogic";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const toast = useToast();

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    navigate(0);
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        boxSizing="border-box"
        justifyContent="space-between"
        alignItems="center"
        bg="#1a1812"
        w="100%"
        p="5px 10px 5px 10px "
        borderWidth="0px"
      >
        <Tooltip label="Search user to Chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            _hover={{ background: "#292721" }}
          >
            {chatIcons.search}
            <Text
              display={{ base: "none", md: "flex" }}
              px="4"
              textColor={"#595757"}
            >
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Work-sans"} textColor={"#fff"}>
          Chat-App
        </Text>
        <div className="flex items-center">
          <Menu>
            <MenuButton p={1} position={"relative"}>
              <div className="m-1">
                {chatIcons.notification}
              </div>
              {notification?.length > 0  && (
                  <Badge variant="solid" position="absolute" colorScheme="red" rounded={"xl"} fontSize={8} top={1} right={2} > 
                  {notification.length}
                </Badge>
              )}
            </MenuButton>
            <MenuList bg={"#1a1812"} textColor={"white"} pl={3}>
              {!notification.length && "No notification available"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  bg={"#1a1812"}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(
                      notification.filter((n) => n.chat._id !== notif.chat._id)
                    );
                  }}
                >
                  {notif.isGroup
                    ? `New message in ${notif.chat.chatName}`
                    : `New message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="none"
              textColor={"#595757"}
              _hover={{ background: "#292721" }}
            >
              <Avatar
                size="sm"
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg={"#1a1812"} textColor={"white"}>
              <ProfileModal user={user}>
                <MenuItem bg={"#1a1812"}>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem bg={"#1a1812"} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"#1a1812"}>
          <DrawerHeader borderBottomWidth={"1px"} textColor={"white"}>
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                textColor={"white"}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading count={10} />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && (
              <Spinner mx={"auto"} mt={10} display={"flex"} color="white" />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
