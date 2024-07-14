import { Button, Flex, Modal, MultiSelect, Text } from "@mantine/core";

export default function ShareModal({
  isOpened,
  onClose,
  handleShare,
  usernamesForShare,
  shareWithUsernames,
  setShareWithUsernames,
}) {
  return (
    <>
      <Modal
        opened={isOpened}
        onClose={onClose}
        centered
        title={
          <Text fw={500} fz={"h4"}>
            Share Task
          </Text>
        }
      >
        <Text fw={500}>Who do you want to share this task with?</Text>
        <Flex justify={"center"} mt={"sm"} gap={"xs"}>
          <MultiSelect
            // label="Who do you want to share this task with?"
            aria-label="Who do you want to share this task with?"
            placeholder="Search usernames"
            data={usernamesForShare}
            value={shareWithUsernames}
            onChange={setShareWithUsernames}
            clearable
            searchable
            maxDropdownHeight={145}
            checkIconPosition="right"
            flex={1}
          />

          <Button onClick={handleShare}>Share</Button>
        </Flex>
      </Modal>
    </>
  );
}
