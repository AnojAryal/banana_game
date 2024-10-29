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
  Link,
  Text,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const { login, isLoading, authError, formErrors } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(
      {
        email: formData.email,
        password: formData.password,
      },
      navigate
    );
  };

  const togglePasswordVisibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  return (
    <Box
      maxWidth="450px"
      width="100%"
      p="6"
      borderRadius="md"
      boxShadow="lg"
      bg={useColorModeValue("white", "gray.800")}
      m="auto"
      mt="8"
    >
      <Heading as="h4" size="lg" mb="6" textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <FormControl isInvalid={!!formErrors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {formErrors.email && (
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!formErrors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <InputRightElement>
                <IconButton
                  aria-label={
                    formData.showPassword ? "Hide password" : "Show password"
                  }
                  icon={formData.showPassword ? <FaEye /> : <FaEyeSlash />}
                  size="sm"
                  onClick={togglePasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>
            {formErrors.password && (
              <FormErrorMessage>{formErrors.password}</FormErrorMessage>
            )}
          </FormControl>

          {authError && (
            <Text color="red.500" textAlign="center">
              {authError}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="teal"
            width="100%"
            isLoading={isLoading}
            spinner={<Spinner size="sm" />}
          >
            Login
          </Button>

          <Text textAlign="center">
            Don’t have an account?{" "}
            <Link color="blue.500" onClick={() => navigate("/signup")}>
              Sign up
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
}

export default Login;
