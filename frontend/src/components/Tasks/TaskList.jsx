import { useCallback, useEffect, useState } from "react";
import { deleteTask, getTasks, updateTask } from "../../api/taskApi";
import {
  Box,
  Container,
  Center,
  Divider,
  SimpleGrid,
  Text,
  Title,
  Loader,
} from "@mantine/core";
import toast from "react-hot-toast";

import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Tasks in Initial Render
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle Task Deletion
  const handleDelete = useCallback(
    async (taskId) => {
      try {
        const response = await deleteTask(taskId);
        toast.success(response.msg);
        fetchTasks();
      } catch (error) {
        toast.error("Failed to delete task");
      }
    },
    [fetchTasks]
  );

  // Handle Task Editing
  const handleEdit = useCallback((task) => {
    setCurrentTask(task);
  }, []);

  // Handle Task Updates
  const handleUpdate = useCallback(
    async (updatedTask) => {
      try {
        const response = await updateTask(currentTask._id, updatedTask);
        toast.success(response.msg);
        setCurrentTask(null);
        fetchTasks();
      } catch (error) {
        toast.error("Failed to update task");
      }
    },
    [currentTask, fetchTasks]
  );

  // Handle Loading Tasks
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
              <Text>No tasks. Add a task to view them here.</Text>
            </Center>
          </>
        )}
      </Container>
    </>
  );
}
