import { Divider, Title } from "@mantine/core";
import TaskList from "../components/Tasks/TaskList";

export default function Dashboard() {
  return (
    <>
      <Title fz={"h3"} ta={"center"}>
        Add Task
      </Title>
      <Divider my="xs" />
      <TaskList />
    </>
  );
}
