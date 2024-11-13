import { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  IconButton,
  InputGroup,
  InputRightElement,
  Box,
  useColorModeValue,
  HStack,
  Grid,
  Text,
  Link,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignUp";

interface SignupForm {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

function Signup() {
  const [formData, setFormData] = useState<SignupForm>({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const navigate = useNavigate();

  const { signup, loading, error } = useSignup();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await signup({
        full_name: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      if (result) {
        console.log("Signup data:", result);
        navigate("/login");
      }
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  return (
    <Box
      height="85vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("white", "gray.800")}
      mt="-5vh"
      overflow="hidden"
    >
      <Box maxWidth="600px" width="100%" p="8" borderRadius="md" boxShadow="lg">
        <Heading as="h3" size="lg" mb="8" textAlign="left">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <Grid templateColumns="1fr 1fr" gap={6}>
              <FormControl isRequired>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  size="lg"
                />
              </FormControl>
            </Grid>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                size="lg"
              />
            </FormControl>
            <HStack spacing={6} justifyContent="center">
              <FormControl isInvalid={!!formErrors.password} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={formData.showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    size="lg"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={
                        formData.showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      icon={formData.showPassword ? <FaEye /> : <FaEyeSlash />}
                      size="sm"
                      onClick={togglePasswordVisibility}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isInvalid={!!formErrors.confirmPassword} isRequired>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <InputGroup>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={formData.showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    size="lg"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={
                        formData.showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      icon={formData.showPassword ? <FaEye /> : <FaEyeSlash />}
                      size="sm"
                      onClick={togglePasswordVisibility}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </HStack>
            <Button
              type="submit"
              colorScheme="teal"
              width="100%"
              size="md"
              isLoading={loading}
            >
              Sign Up
            </Button>
            {error && <Text color="red.500">{error}</Text>}{" "}
            <HStack
              width="100%"
              height="50px"
              justifyContent="center"
              spacing={1}
            >
              <Text fontSize="md">Already have an account?</Text>
              <Link color="blue.500" onClick={() => navigate("/login")}>
                Login
              </Link>
            </HStack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Signup;
