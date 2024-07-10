import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "Multiple User Accounts",
      description: "Create and manage multiple browser-level user accounts.",
    },
    {
      title: "Task Management",
      description:
        "Create, view, and track your tasks with titles, descriptions, completion status, and deadlines.",
    },
    {
      title: "Task Sharing",
      description:
        "Easily share tasks with other users and collaborate efficiently on shared tasks.",
    },
    {
      title: "Shared task View",
      description:
        "Access a dedicated space to view tasks shared with you, including task details and owner information.",
    },
  ];

  const featuresItems = features.map((feature, idx) => {
    return (
      <Paper shadow="sm" p="xl" key={idx}>
        <Title c={"blue"} fz={"h3"}>
          {feature.title}
        </Title>
        <Text>{feature.description}</Text>
      </Paper>
    );
  });

  const navigate = useNavigate();

  return (
    <>
      <Container size={1400} p={0}>
        <section>
          <Center mih="40dvh">
            <Box ta="center">
              <Title my="xs" c="blue">
                Collaborate Effortlessly with TaskShare
              </Title>
              <Text size="lg" c="dimmed">
                Manage your tasks, share with others and boost productivity
                together.
              </Text>
              <Flex justify="center" my="md">
                <Button onClick={() => navigate("/login")} size="lg">Get Started</Button>
              </Flex>
            </Box>
          </Center>
        </section>
        <section>
          <Container size={850} p={0}>
            <SimpleGrid
              cols={{ base: 1, xs: 2 }}
            >
              {featuresItems}
            </SimpleGrid>
          </Container>
        </section>
      </Container>
    </>
  );
}
