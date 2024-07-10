import { useEffect, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Menu,
  Modal,
  MultiSelect,
  rem,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconEdit, IconShare, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

import { getAllUsernames } from "../../api/authApi";
import { shareTask } from "../../api/taskApi";
import { formatDateTime } from "../../utils/helpers";
import { authSelector } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

export default function TaskItem({ task, onDelete, onEdit }) {
  const [shareOpened, { open: shareOpen, close: shareClose }] =
    useDisclosure(false);
  const [taskOpened, { close: taskClose, open: taskOpen }] =
    useDisclosure(false);

  const auth = useSelector(authSelector);
  const taskOwner = auth.user._id === task.owner._id;

  const [usernames, setUsernames] = useState([]);
  const [shareWithUsernames, setShareWithUsernames] = useState([]);

  useEffect(() => {
    const allUsernames = [];
    getAllUsernames().then((users) => {
      users.map((user) => allUsernames.push(user.username));
    });
    setUsernames(allUsernames);
  }, []);

  const handleShare = async () => {
    const response = await shareTask({ taskId: task._id, shareWithUsernames });
    toast(response.msg);
    shareClose();
  };

  // console.log("auth.user._id: " + auth.user._id);
  // console.log("taskOwner: " + taskOwner);
  // console.log("task: " + task);

  return (
    <>
      {/* Task card */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Box>
              <Text
                fw={{ base: 400, sm: 500 }}
                fz={{ base: "h4", sm: "h3" }}
                truncate="end"
                onClick={taskOpen}
                style={{ cursor: "pointer" }}
              >
                {task.title}
              </Text>
              <Text c={"dimmed"} size="xs">
                Deadline: {formatDateTime(task.deadline)}
              </Text>
            </Box>
            {taskOwner && (
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconShare style={{ width: rem(14), height: rem(14) }} />
                    }
                    onClick={shareOpen}
                  >
                    Share
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconEdit style={{ width: rem(14), height: rem(14) }} />
                    }
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} />
                    }
                    color="red"
                    onClick={() => onDelete(task._id)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Card.Section>
        <Text
          mt={"sm"}
          lineClamp={3}
          onClick={taskOpen}
          style={{ cursor: "pointer" }}
        >
          {task.description}
        </Text>
      </Card>
      {/* Share Modal */}
      <Modal
        opened={shareOpened}
        onClose={shareClose}
        title="Share Task"
        centered
      >
        <MultiSelect
          label="Who do you want to share this task with?"
          placeholder="Search username"
          clearable
          searchable
          data={usernames}
          value={shareWithUsernames}
          onChange={setShareWithUsernames}
          limit={5}
          maxDropdownHeight={200}
        />
        <Flex justify={"center"} mt={"sm"}>
          <Button onClick={handleShare}>Share</Button>
        </Flex>
      </Modal>
      {/* Task Modal */}
      <Modal
        opened={taskOpened}
        onClose={taskClose}
        centered
        title={
          <Text
            fw={{ base: 400, sm: 500 }}
            fz={{ base: "h4", sm: "h3" }}
            truncate="end"
          >
            {task.title}
          </Text>
        }
      >
        <Text my={"sm"}>{task.description}</Text>
        <Divider my={"sm"} />
        <Text fw={500}>Owner</Text>
        <Text>{task?.owner?.username}</Text>
        <Divider my={"sm"} />
        <Text fw={500}>Shared with</Text>
        <Group gap={5}>
          {task?.sharedWith?.map((user, idx) => (
            <Text key={idx}>
              {user.username}
              {idx < task?.sharedWith?.length - 1 ? "," : ""}
            </Text>
          ))}
        </Group>
      </Modal>
    </>
  );
}
