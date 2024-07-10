import { Button, Group, Modal, Text } from "@mantine/core";

export default function LogoutModal({ isOpened, onClose, onLogout }) {
  return (
    <>
      <Modal
        opened={isOpened}
        onClose={onClose}
        centered
        size="auto"
        title={<Text fw={500} fz={"h4"}>Logout</Text>}
      >
        <Text fw={500}>Are you sure you want to logout?</Text>
        <Group mt={"sm"}>
          <Button flex={1} onClick={onClose}>
            No
          </Button>
          <Button flex={1} onClick={onLogout} color={"red"}>
            Yes
          </Button>
        </Group>
      </Modal>
    </>
  );
}
