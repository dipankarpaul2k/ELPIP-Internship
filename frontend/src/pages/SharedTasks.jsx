import { useSelector } from "react-redux";
import { Box, Center, Divider, SimpleGrid, Text, Title } from "@mantine/core";
import { authSelector } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { getSharedTasks } from "../api/taskApi";
import TaskItem from "../components/Tasks/TaskItem";

export default function SharedTasks() {
  const auth = useSelector(authSelector);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const tasks = await getSharedTasks();
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // console.log(tasks);

  if (loading) {
    return (
      <>
        <Box>
          <p>Loading...</p>
        </Box>
      </>
    );
  }

  return (
    <>
      <Title fz={{ base: "h4", xs: "h3" }}>
        Task shared with {auth?.user?.username}
      </Title>
      <Divider my="sm" />
      {tasks.length > 0 ? (
        <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} px={0}>
          {tasks?.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </SimpleGrid>
      ) : (
        <>
          <Center>
            <Text>No task shared with you.</Text>
          </Center>
        </>
      )}
    </>
  );
}
