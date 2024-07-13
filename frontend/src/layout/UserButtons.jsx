import { Button } from "@mantine/core";

const UserButtons = ({ smoothNavigation, openLogoutModal }) => (
  <>
    <Button
      onClick={() => smoothNavigation("/")}
      variant="subtle"
      size="md"
      px={"md"}
    >
      Home
    </Button>
    <Button
      onClick={() => smoothNavigation("/shared")}
      variant="subtle"
      size="md"
      px={"md"}
    >
      Shared
    </Button>
    <Button
      onClick={openLogoutModal}
      variant="filled"
      color="red"
      size="md"
      px="md"
      mt={{ base: "auto", sm: 0 }}
    >
      Logout
    </Button>
  </>
);

export default UserButtons;
