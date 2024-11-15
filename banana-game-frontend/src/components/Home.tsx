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
  Progress,
  IconButton,
  Tooltip,
  useColorMode,
  useBreakpointValue,
  Flex, 
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useGameData from "../hooks/useGetGame";
import { AiOutlineReload, AiFillSmile, AiFillFrown } from "react-icons/ai";
import { username } from "./DecodeToken";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Home = () => {
  const { gameData, loading, error, refetch } = useGameData(); 
  const [guess, setGuess] = useState(""); 
  const [chances, setChances] = useState(3); 
  const [logs, setLogs] = useState<string[]>([]); 
  const [motivationMessage, setMotivationMessage] = useState(""); 
  const [answered, setAnswered] = useState(false); 
  const toast = useToast(); 
  const { colorMode } = useColorMode(); 
  const headingFontSize = useBreakpointValue({ base: "md", md: "xl" }); 

  useEffect(() => {
    if (gameData) {
      setGuess(""); 
      setChances(3);
      setLogs([]);
      setMotivationMessage("");
      setAnswered(false);
    }
  }, [gameData]);

  const getMotivationMessage = (remainingChances: number) => {
    switch (remainingChances) {
      case 2:
        return "Keep going! You can do it!";
      case 1:
        return "Don't give up! Try once more!";
      default:
        return `Hello ${username}, welcome to Banana Game!`;
    }
  };

  const handleGuess = () => {
    if (
      gameData &&
      guess.toLowerCase() === String(gameData.solution).toLowerCase()
    ) {
      setLogs((prevLogs) => [...prevLogs, "Correct answer!"]);
      toast({ title: "Correct!", status: "success", duration: 2000 });
      setAnswered(true);
      setMotivationMessage("");
    } else {
      setChances((prevChances) => prevChances - 1);
      setLogs((prevLogs) => [...prevLogs, "Incorrect, try again."]);
      toast({ title: "Incorrect answer.", status: "error", duration: 2000 });
      setMotivationMessage(getMotivationMessage(chances - 1));
    }
    setGuess(""); 
  };

  const handleNext = () => {
    setLogs((prevLogs) => [...prevLogs, "Skipped"]);
    setChances(3);
    refetch();
    setMotivationMessage("");
    setAnswered(false);
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
    <Box
      p={5}
      borderRadius="md"
      boxShadow="md"
      bg={colorMode === "light" ? "transparent" : "gray.800"}
    >
      <Heading
        mb={4}
        fontSize={headingFontSize}
        textAlign="left"
        color={colorMode === "light" ? "gray.800" : "white"}
      >
        {motivationMessage || `Hello ${username}, welcome to Banana Game!`}
      </Heading>
      {gameData ? (
        <HStack align="flex-start" spacing={8}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            padding="4"
            boxShadow="md"
            bg={colorMode === "light" ? "white" : "gray.700"}
            textAlign="center"
          >
            <Image
              src={gameData.question}
              alt="Game Question"
              borderRadius="md"
              maxW="100%"
            />
            {(chances <= 0 || answered) && (
              <Text mt={2} color="red.500">
                Solution: {gameData.solution}
              </Text>
            )}
            <Tooltip
              label="Click to reload a new question"
              aria-label="Reload tooltip"
            >
              <IconButton
                icon={<AiOutlineReload />}
                colorScheme="teal"
                variant="ghost"
                onClick={handleNext} 
                mt={3}
                aria-label="Next question"
              />
            </Tooltip>
          </Box>

          <VStack align="stretch" spacing={4} w="full" maxW="sm">
            <Text
              fontWeight="bold"
              color={colorMode === "light" ? "gray.700" : "white"}
            >
              Your Answer
            </Text>
            <Input
              placeholder="Enter your guess"
              value={guess}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d*$/.test(input)) setGuess(input);
              }}
              bg={colorMode === "light" ? "white" : "gray.600"}
              color={colorMode === "light" ? "black" : "white"}
              isDisabled={chances <= 0 || answered}
            />

            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                onClick={handleGuess} 
                isDisabled={!guess || chances <= 0 || answered}
              >
                Submit
              </Button>
              <Button
                colorScheme="gray"
                onClick={handleNext}
                isDisabled={!answered && chances > 0}
              >
                Next
              </Button>
            </HStack>

            <Flex justify={"end"} mt={2}>
              {[...Array(3)].map((_, index) => (
                <Icon
                  as={index < chances ? FaHeart : FaRegHeart}
                  key={index}
                  color={index < chances ? "red.500" : "gray.300"}
                  boxSize={5}
                  mx={1}
                />
              ))}
            </Flex>

            <Progress
              value={((0 + chances) / 3) * 100}
              size="sm"
              colorScheme="red"
              hasStripe
              isAnimated
              mt={4}
            />

            <Box
              mt={4}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              maxH="200px"
              overflowY="auto"
              bg={colorMode === "light" ? "gray.100" : "gray.700"}
            >
              <Text
                fontWeight="bold"
                mb={2}
                color={colorMode === "light" ? "gray.800" : "white"}
              >
                Logs
              </Text>
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <Text
                    key={index}
                    color={colorMode === "light" ? "gray.700" : "white"}
                  >
                    {log}
                  </Text>
                ))
              ) : (
                <Text color={colorMode === "light" ? "gray.700" : "white"}>
                  No logs yet.
                </Text>
              )}
            </Box>

            {chances > 0 && answered ? (
              <Box textAlign="center" mt={4}>
                <HStack spacing={4} justify="center">
                  <AiFillSmile size={50} color="green" />
                  <Text fontSize="xl" color="green.500" fontWeight="bold">
                    Great job! Your Guess is Correct.
                  </Text>
                </HStack>
              </Box>
            ) : chances <= 0 && !answered ? (
              <Box textAlign="center" mt={4}>
                <HStack spacing={4} justify="center">
                  <AiFillFrown size={50} color="red" />
                  <Text fontSize="xl" color="red.500" fontWeight="bold">
                    Game Over! Try again next time.
                  </Text>
                </HStack>
              </Box>
            ) : null}
          </VStack>
        </HStack>
      ) : (
        <Text>No game data available.</Text>
      )}
    </Box>
  );
};

export default Home;
