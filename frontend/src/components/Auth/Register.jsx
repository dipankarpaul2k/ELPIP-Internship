import { useCallback, useState } from "react";
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
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../../api/authApi";
import { setUser } from "../../features/auth/authSlice";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
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
  //     const response = await register(formData);
  //     toast(response.msg);
  //     dispatch(setUser(response.user));
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     // toast(error.message);
  //     toast(error?.response?.data?.msg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!formData.name || formData.name.length < 3) {
        toast.error("Name must be at least 3 characters long");
        return;
      }
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
        const response = await register(formData);
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
            <Title ta={"center"}>Register</Title>
            <Text ta={"center"}>Join Us Today!</Text>
          </Box>
          <form
            style={{ width: "100%", minWidth: "400px" }}
            onSubmit={handleSubmit}
          >
            <TextInput
              label="Name"
              description="Name must be at least 3 characters long"
              placeholder="John Doe"
              type="text"
              name="name"
              size="lg"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextInput
              label="Username"
              description="Username must be at least 3 characters long"
              placeholder="johndoe"
              type="text"
              name="username"
              size="lg"
              value={formData.username}
              onChange={handleInputChange}
            />
            <PasswordInput
              label="Password"
              description="Password must be at least 5 characters long"
              placeholder="Input password"
              name="password"
              size="lg"
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
                Register
              </Button>
            </Flex>
          </form>
          <Box my={"sm"}>
            <Text ta={"center"}>
              Already have an account?{" "}
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  color: "var(--mantine-color-blue-text)",
                }}
              >
                Login here
              </Link>
            </Text>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
