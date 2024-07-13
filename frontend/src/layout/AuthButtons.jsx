import { Button } from "@mantine/core";

const AuthButtons = ({ smoothNavigation }) => (
  <>
    <Button
      onClick={() => smoothNavigation("/login")}
      variant="subtle"
      size="md"
      px={"md"}
    >
      Login
    </Button>
    <Button onClick={() => smoothNavigation("/register")} size="md" px={"md"}>
      Register
    </Button>
  </>
);

export default AuthButtons;
