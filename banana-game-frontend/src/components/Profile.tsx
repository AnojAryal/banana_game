import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  HStack,
  Avatar,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { FaEnvelope, FaGamepad, FaClock } from "react-icons/fa";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const Profile = ({ isOpen, onClose }: ProfileProps) => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    totalGamesPlayed: 0,
    lastPlayed: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedData = {
        fullName: "John Doe",
        username: "johndoe123",
        email: "johndoe@example.com",
        totalGamesPlayed: 25,
        lastPlayed: "2024-11-13",
      };
      setProfileData(storedData);
    };
    fetchUserProfile();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="400px">
        <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
          Profile
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="center">
            <Avatar size="xl" name={profileData.fullName} mb={2} />
            <Text fontSize="lg" fontWeight="semibold">
              {profileData.fullName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {profileData.username}
            </Text>

            <Divider />
            <VStack spacing={3} align="start" w="full" pl={4}>
              <HStack>
                <Icon as={FaEnvelope} color="blue.500" />
                <Text fontSize="md">
                  <strong>Email:</strong> {profileData.email}
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaGamepad} color="green.500" />
                <Text fontSize="md">
                  <strong>Total Games Played:</strong>{" "}
                  {profileData.totalGamesPlayed}
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} color="purple.500" />
                <Text fontSize="md">
                  <strong>Last Played:</strong> {profileData.lastPlayed}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="flex-end">
          <Button size="sm" colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
