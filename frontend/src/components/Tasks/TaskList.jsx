import { useEffect, useState } from "react";
import {
  deleteTask,
  getTasks,
  updateTask,
} from "../../api/taskApi";
import {
  Box,
  Container,
  Center,
  Divider,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import toast from "react-hot-toast";

import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (taskId) => {
    const response = await deleteTask(taskId);
    toast(response.msg);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  const handleUpdate = async (updatedTask) => {
    const response = await updateTask(currentTask._id, updatedTask);
    toast(response.msg);
    setCurrentTask(null);
    fetchTasks();
  };

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
      <TaskForm
        fetchTasks={fetchTasks}
        currentTask={currentTask}
        handleUpdate={handleUpdate}
      />
      <Divider my="xs" />
      <Container p={0} size={1000}>
        <Title fz={{ base: "h4", xs: "h3" }} ta={"center"} my="xs">
          TaskList
        </Title>
        {tasks.length > 0 ? (
          <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} px={0}>
            {tasks?.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
                refetchTasks={fetchTasks} 
              />
            ))}
          </SimpleGrid>
        ) : (
          <>
            <Center>
              <Text>No task. Add a task to view them here.</Text>
            </Center>
          </>
        )}
      </Container>
    </>
  );
}
