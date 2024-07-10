import { Button, Group, Modal, Text } from "@mantine/core";

export default function LogoutModal({ isOpened, onClose, onLogout }) {
  return (
    <>
      <Modal
        opened={isOpened}
        onClose={onClose}
        size="auto"
        withCloseButton={false}
        centered
      >
        <Text>Are you sure you want to logout?</Text>
        <Group mt={"sm"}>
          <Button flex={1} onClick={onClose}>
            Cancel
          </Button>
          <Button flex={1} onClick={onLogout} color={"red"}>
            Logout
          </Button>
        </Group>
      </Modal>
    </>
  );
}
