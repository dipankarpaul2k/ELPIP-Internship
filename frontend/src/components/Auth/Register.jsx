import {
  Box,
  Button,
  Center,
  Flex,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../../api/authApi";
import { setUser } from "../../features/auth/authSlice";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    // console.log(formData);
    const response = await register(formData);
    // console.log(response);
    toast(response.msg);
    dispatch(setUser(response.user));
    navigate("/");
  };

  return (
    <Box mih={"70vh"}>
      <Center mih={"70vh"}>
        <Box>
          <Title ta={"center"}>Register</Title>
          <form
            style={{ width: "100%", minWidth: "400px" }}
            onSubmit={handleSubmit}
          >
            <TextInput
              label="Name"
              placeholder="John Doe"
              type="text"
              name="name"
              size="lg"
            />
            <TextInput
              label="Username"
              placeholder="johndoe"
              type="text"
              name="username"
              size="lg"
            />
            <PasswordInput
              label="Password"
              placeholder="Input password"
              name="password"
              size="lg"
            />
            <Flex justify={"center"} mt={"sm"}>
              <Button type="submit" loading={loading} size="lg">
                Submit
              </Button>
            </Flex>
          </form>
        </Box>
      </Center>
    </Box>
  );
}
