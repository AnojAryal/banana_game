import { useRef, useState, useEffect } from "react";
import {
  Flex,
  Spacer,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { FaSignOutAlt, FaUser, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "./DecodeToken";
import Profile from "./Profile";

const NavBar = () => {
  const navigate = useNavigate();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onCloseLogout = () => setIsLogoutOpen(false);

  const onConfirmLogout = () => {
    onCloseLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleLogoutClick = () => setIsLogoutOpen(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);

      if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
        console.warn("Token has expired or is invalid.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        navigate("/login");
      }
    }
  }, [token, navigate]);

  return (
    <>
      <Flex as="nav" p="4" alignItems="center">
        <Spacer />
        <ColorModeSwitch />
        {token && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaBars />}
              variant="outline"
              ml={4}
              aria-label="Options"
            />
            <MenuList>
              <MenuItem icon={<FaUser />} onClick={onProfileOpen}>
                Profile
              </MenuItem>
              <MenuItem icon={<FaSignOutAlt />} onClick={handleLogoutClick}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <Profile isOpen={isProfileOpen} onClose={onProfileClose} />

      <AlertDialog
        isOpen={isLogoutOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseLogout}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to log out?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseLogout}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirmLogout} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default NavBar;
