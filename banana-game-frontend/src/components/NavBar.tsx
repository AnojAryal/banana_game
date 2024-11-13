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
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "./DecodeToken";

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onClose = () => setIsOpen(false);

  const onConfirmLogout = () => {
    onClose();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleLogoutClick = () => setIsOpen(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);

      if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
        // Token is invalid or expired
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
          <IconButton
            aria-label="Logout"
            icon={<FaSignOutAlt />}
            onClick={handleLogoutClick}
            ml={4}
          />
        )}
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to log out?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
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
