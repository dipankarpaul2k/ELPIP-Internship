import { useEffect, useState, useCallback, memo as reactMemo } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import toast from "react-hot-toast";

import { createTask } from "../../api/taskApi";

const TaskForm = reactMemo(
  ({ fetchTasks, currentTask, handleUpdate, handleCancelUpdate }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(new Date());

    // Handle Reset Form
    const resetForm = useCallback(() => {
      setTitle("");
      setDescription("");
      setDeadline(new Date());
    }, []);

    // Fill the form based on the currentTask
    useEffect(() => {
      if (currentTask) {
        setTitle(currentTask.title);
        setDescription(currentTask.description);
        setDeadline(new Date(currentTask.deadline));
      } else {
        resetForm();
      }
    }, [currentTask, resetForm]);

    // Handle Task Sunmission
    const handleTaskSubmit = async () => {
      // console.log(title, description, deadline);
      if (!title || !description || !deadline) {
        toast.error("All fields are required");
        return;
      }

      try {
        if (currentTask) {
          await handleUpdate({ title, description, deadline });
        } else {
          const response = await createTask({ title, description, deadline });
          toast.success(response.msg);
        }
        fetchTasks();
        resetForm();
      } catch (error) {
        toast.error("Something went wrong");
      }
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
            <Flex mt={"sm"} justify={"center"} gap={"sm"}>
              {currentTask && (
                <Button onClick={handleCancelUpdate}>Cancel Update</Button>
              )}
              <Button onClick={handleTaskSubmit}>
                {currentTask ? "Update" : "Add"} Task
              </Button>
            </Flex>
          </Box>
        </Container>
      </>
    );
  }
);

export default TaskForm;
