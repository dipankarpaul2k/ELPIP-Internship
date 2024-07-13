import {
  Box,
  Button,
  Center,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../../api/authApi";
import { setUser } from "../../features/auth/authSlice";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "username2",
    password: "12345",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     setLoading(true);
  //     const form = event.currentTarget;
  //     const formData = Object.fromEntries(new FormData(form));
  //     const response = await login(formData);
  //     toast(response.msg);
  //     dispatch(setUser(response.user));
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     toast(error?.response?.data?.msg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!formData.username || formData.username.length < 3) {
        toast.error("Username must be at least 3 characters long");
        return;
      }
      if (!formData.password || formData.password.length < 5) {
        toast.error("Password must be at least 5 characters long");
        return;
      }
      try {
        setLoading(true);
        const response = await login(formData);
        toast.success(response.msg);
        dispatch(setUser(response.user));
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [formData, dispatch, navigate]
  );

  return (
    <Box mih={"70vh"}>
      <Center mih={"70vh"}>
        <Box>
          <Box my={"sm"}>
            <Title ta={"center"}>Log In</Title>
            <Text ta={"center"}>Welcome Back!</Text>
          </Box>
          <form
            style={{ width: "100%", minWidth: "400px" }}
            onSubmit={handleSubmit}
          >
            <TextInput
              label="Username"
              description="Username must be at least 3 characters long"
              placeholder="johndoe"
              type="text"
              name="username"
              size="lg"
              // defaultValue={"username2"}
              value={formData.username}
              onChange={handleInputChange}
            />
            <PasswordInput
              label="Password"
              description="Password must be at least 5 characters long"
              placeholder="Input password"
              name="password"
              size="lg"
              // defaultValue={"12345"}
              value={formData.password}
              onChange={handleInputChange}
            />
            <Flex justify={"center"} mt={"sm"}>
              <Button
                type="submit"
                size="lg"
                loading={loading}
                disabled={loading}
              >
                Log In
              </Button>
            </Flex>
          </form>
          <Box my={"sm"}>
            <Text ta={"center"}>
              New here?{" "}
              <Link
                to={"/register"}
                style={{
                  textDecoration: "none",
                  color: "var(--mantine-color-blue-text)",
                }}
              >
                Register now
              </Link>
            </Text>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
