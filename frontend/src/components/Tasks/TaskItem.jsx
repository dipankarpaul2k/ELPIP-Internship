import { useState } from "react";
import {
  ActionIcon,
  Box,
  Card,
  Group,
  Indicator,
  Menu,
  rem,
  Text,
  VisuallyHidden,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCircleCheck,
  IconDots,
  IconEdit,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { shareTask, toggleTaskCompletion } from "../../api/taskApi";
import { formatDateTime } from "../../utils/helpers";
import { authSelector } from "../../features/auth/authSlice";
import ShareModal from "../Modals/ShareModal";
import TaskViewModal from "../Modals/TaskViewModal";

export default function TaskItem({ task, onDelete, onEdit, refetchTasks }) {
  const [shareOpened, { open: shareOpen, close: shareClose }] =
    useDisclosure(false);
  const [taskOpened, { close: taskClose, open: taskOpen }] =
    useDisclosure(false);

  const auth = useSelector(authSelector);
  const taskOwner = auth.user._id === task.owner._id;

  const [shareWithUsernames, setShareWithUsernames] = useState([]);

  // Handle Toggle Task Completion State
  const handleToggleTaskCompletion = async () => {
    const response = await toggleTaskCompletion(task._id);
    toast(response.msg);
    refetchTasks();
  };

  // Handle Toggle Task Sharing
  const handleShare = async () => {
    const response = await shareTask({ taskId: task._id, shareWithUsernames });
    toast(response.msg);
    shareClose();
    refetchTasks();
  };

  const indicatorLabel = task.completed ? "Done" : "Pending";
  const indicatorLabelColor = task.completed ? "green" : "red";

  return (
    <Indicator
      size={16}
      inline
      withBorder
      position="top-start"
      label={indicatorLabel}
      color={indicatorLabelColor}
    >
      {/* Task card */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Box w={"70%"}>
              {/* Task Title */}
              <Text
                fw={500}
                fz={{ base: "h4", sm: "h3" }}
                truncate="end"
                onClick={taskOpen}
                style={{ cursor: "pointer" }}
              >
                {task.title}
              </Text>
              {/* Task Deadline */}
              <Text c={"dimmed"} size="xs">
                Deadline: {formatDateTime(task.deadline)}
              </Text>
            </Box>
            {taskOwner && (
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                    <VisuallyHidden>Task item menu</VisuallyHidden>
                  </ActionIcon>
                </Menu.Target>
                {/* Menu Dropdowm */}
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconCircleCheck
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={handleToggleTaskCompletion}
                  >
                    {task.completed ? "Pending" : "Done"}
                  </Menu.Item>
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
        {/* Task Description */}
        <Text
          mt={"sm"}
          lineClamp={2}
          onClick={taskOpen}
          style={{ cursor: "pointer" }}
        >
          {task.description}
        </Text>
      </Card>

      {/* Share Modal */}
      <ShareModal
        isOpened={shareOpened}
        onClose={shareClose}
        handleShare={handleShare}
        shareWithUsernames={shareWithUsernames}
        setShareWithUsernames={setShareWithUsernames}
      />

      {/* Task Modal */}
      <TaskViewModal isOpened={taskOpened} onClose={taskClose} task={task} />
    </Indicator>
  );
}
