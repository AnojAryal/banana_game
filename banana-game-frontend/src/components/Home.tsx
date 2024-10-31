import {
  Image,
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Input,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useGameData from "../hooks/useGetGame";
import { username } from "./DecodeToken";

const Home = () => {
  const { gameData, loading, error, refetch } = useGameData();
  const [guess, setGuess] = useState("");
  const [chances, setChances] = useState(3);
  const [logs, setLogs] = useState<string[]>([]);
  const [motivationMessage, setMotivationMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (gameData) {
      setGuess("");
      setChances(3);
      setLogs([]);
      setMotivationMessage("");
    }
  }, [gameData]);

  const getMotivationMessage = (remainingChances: number) => {
    switch (remainingChances) {
      case 2:
        return "Keep going! You can do it!";
      case 1:
        return "Don't give up! Try once more!";
      default:
        return `Hello ${username}, welcome to Banana Game!;`;
    }
  };

  const handleGuess = () => {
    if (
      gameData &&
      guess.toLowerCase() === String(gameData.solution).toLowerCase()
    ) {
      setLogs((prevLogs) => [...prevLogs, "Correct answer!"]);
      toast({ title: "Correct!", status: "success", duration: 2000 });
      refetch();
      setMotivationMessage("");
    } else {
      setChances((prevChances) => prevChances - 1);
      setLogs((prevLogs) => [...prevLogs, "Incorrect, try again."]);
      toast({ title: "Incorrect answer.", status: "error", duration: 2000 });
      setMotivationMessage(getMotivationMessage(chances - 1));
    }
    setGuess("");
  };

  const handleSkip = () => {
    setLogs((prevLogs) => [...prevLogs, "Skipped"]);
    setChances(3);
    refetch();
    setMotivationMessage("");
  };

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
    <Box>
      <Heading mb={5}>
        {motivationMessage || `Hello ${username}, welcome to Banana Game!`}
      </Heading>
      {gameData ? (
        <HStack align="flex-start" spacing={8}>
          <Box borderWidth="1px" borderRadius="lg" padding="4" boxShadow="md">
            <Image
              src={gameData.question}
              alt="Game Question"
              borderRadius="md"  
              maxW="100%"
            />
            {chances <= 0 && (
              <Text mt={2} color="red.500">
                Solution: {gameData.solution}
              </Text>
            )}
          </Box>

          <VStack align="stretch" spacing={4} w="full" maxW="sm">
            <Text fontWeight="bold">Your Answer</Text>
            <Input
              placeholder="Enter your guess"
              value={guess}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d*$/.test(input)) setGuess(input);
              }}
            />

            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                onClick={handleGuess}
                isDisabled={!guess || chances <= 0}
              >
                Submit
              </Button>
              <Button colorScheme="gray" onClick={handleSkip}>
                Skip
              </Button>
            </HStack>
            <Text>Chances remaining: {chances}</Text>
            <Box
              mt={4}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              maxH="200px"
              overflowY="auto"
            >
              <Text fontWeight="bold" mb={2}>
                Logs
              </Text>
              {logs.length > 0 ? (
                logs.map((log, index) => <Text key={index}>{log}</Text>)
              ) : (
                <Text>No logs yet.</Text>
              )}
            </Box>
          </VStack>
        </HStack>
      ) : (
        <Text>No game data available.</Text>
      )}
    </Box>
  );
};

export default Home;
