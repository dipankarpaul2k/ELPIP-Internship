import {
  AppShell,
  Box,
  Burger,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { authSelector } from "../features/auth/authSlice";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default function AppLayout() {
  const [opened, { toggle, close: closeNav }] = useDisclosure();
  const auth = useSelector(authSelector);
  const userName = auth?.user?.username;
  // console.log(userName);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Group justify="space-between" style={{ flex: 1 }}>
              <Title
                fz={{ base: "h3", sm: "h2" }}
                c={"blue"}
                component={Link}
                to="/"
                style={{ textDecoration: "none" }}
              >
                TaskShare
              </Title>
              <Group ml="xl" gap={5} visibleFrom="sm">
                {userName && (
                  <Text mr={"sm"} fw={400}>
                    Hi {userName}
                  </Text>
                )}
                <AppHeader />
              </Group>
            </Group>
            <Group>
              {userName && (
                <Text mr={"sm"} fw={400} hiddenFrom="sm">
                  Hi {userName}
                </Text>
              )}
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="md"
              />
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar py="md" px={4}>
          <Stack align="stretch" justify="flex-start" gap="sm" h={"100%"} pb={"sm"}>
            <AppHeader closeNav={closeNav}/>
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main>
          <Box mih={"80vh"}>
            <Outlet />
          </Box>
          <AppFooter />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
