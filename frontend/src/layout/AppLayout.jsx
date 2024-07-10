import { AppShell, Box, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

// import classes from "./Layout.module.css";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

// Outlet

export default function AppLayout() {
  const [opened, { toggle }] = useDisclosure();
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
              <Group ml="xl" gap={0} visibleFrom="sm">
                <AppHeader />
              </Group>
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="md"
            />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          <AppHeader />
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
