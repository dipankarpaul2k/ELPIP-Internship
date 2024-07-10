import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { createTask } from "../../api/taskApi";
import toast from "react-hot-toast";

export default function TaskForm({ fetchTasks, currentTask, handleUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDeadline(new Date(currentTask.deadline));
    } else {
      setTitle("");
      setDescription("");
      setDeadline(new Date());
    }
  }, [currentTask]);

  const handleTaskSubmit = async () => {
    // console.log(title, description, deadline);
    if (currentTask) {
      handleUpdate({ title, description, deadline });
    } else {
      const response = await createTask({ title, description, deadline });
      toast(response.msg);
      fetchTasks();
    }
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <>
      <Container p={0} size={1000}>
        <Box>
          <TextInput
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          />
          <Textarea
            label="Description"
            name="description"
            autosize
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <DateTimePicker
            label="Deadline"
            name="deadline"
            placeholder="Pick date and time"
            valueFormat="DD MMM YYYY hh:mm A"
            dropdownType="modal"
            value={deadline}
            onChange={setDeadline}
            required
          />
          <Flex mt={"sm"} justify={"center"}>
            <Button onClick={handleTaskSubmit}>
              {currentTask ? "Update" : "Add"} Todo
            </Button>
          </Flex>
        </Box>
      </Container>
    </>
  );
}
