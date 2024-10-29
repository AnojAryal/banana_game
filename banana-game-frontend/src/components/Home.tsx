import {
  Image,
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useGameData from "../hooks/useGetGame";

const Home = () => {
  const { gameData, loading, error } = useGameData();
  console.log("This is game data:", gameData);

  if (loading) {
    return (
      <Box textAlign="center" p={5}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={5}>
        <Alert status="error">
          <AlertIcon />
          Error: {error.message}
        </Alert>
      </Box>
    );
  }


  return (
    <Box p={5}>
      <Heading as="h1" mb={5}>
        Game Data
      </Heading>
      {gameData ? (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          padding="4"
          boxShadow="md"
        >
          <Image
            src={gameData.question} 
            alt="Game Question"
            borderRadius="md"
            maxW="100%"
          />
          <Text mt={2}>Solution: {gameData.solution}</Text>
        </Box>
      ) : (
        <Text>No game data available.</Text>
      )}
    </Box>
  );
};

export default Home;
