import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Center,
  Container,
  Loader,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";

import { getSharedTasks } from "../api/taskApi";
import TaskItem from "../components/Tasks/TaskItem";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function SharedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Shared Tasks
  const fetchSharedTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasks = await getSharedTasks();
      setTasks(tasks);
    } catch (error) {
      console.log(error);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSharedTasks();
  }, [fetchSharedTasks]);

  // console.log(tasks);

  if (loading) {
    return (
      <Box mih={"80vh"}>
        <Center mih={"80vh"}>
          <Loader color="blue" size="lg" type="bars" />
        </Center>
      </Box>
    );
  }

  return (
    <>
      {/* If Error */}
      {error && (
        <Alert
          variant="light"
          color="red"
          title="Error"
          icon={<IconExclamationCircle stroke={2} />}
        >
          {error}
        </Alert>
      )}
      <Title fz={{ base: "h4", xs: "h3" }} ta={"center"} mb={"sm"}>
        Task shared with you
      </Title>
      {/* <Divider my="sm" /> */}
      <Container p={0} size={1000}>
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
      </Container>
    </>
  );
}
