import { Button, Flex, Modal, MultiSelect, Text } from "@mantine/core";
import { useEffect, useState, useCallback } from "react";
import { getAllUsernames } from "../../api/authApi";

export default function ShareModal({
  isOpened,
  onClose,
  handleShare,
  shareWithUsernames,
  setShareWithUsernames,
}) {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    fetchUsernames();
  }, [fetchUsernames]);

  // Fetch All Usernames For Sharing
  const fetchUsernames = useCallback(async () => {
    try {
      const users = await getAllUsernames();
      const allUsernames = users.map((user) => user.username);
      setUsernames(allUsernames);
    } catch (error) {
      console.error("Failed to fetch usernames", error);
    }
  }, []);

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
            data={usernames}
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
