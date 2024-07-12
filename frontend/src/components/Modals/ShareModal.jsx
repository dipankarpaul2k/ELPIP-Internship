import { Button, Flex, Modal, MultiSelect, Text } from "@mantine/core";
import { useEffect, useState } from "react";
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
    const allUsernames = [];
    getAllUsernames().then((users) => {
      users.map((user) => allUsernames.push(user.username));
    });
    setUsernames(allUsernames);
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
        <MultiSelect
          label="Who do you want to share this task with?"
          placeholder="Search usernames"
          data={usernames}
          value={shareWithUsernames}
          onChange={setShareWithUsernames}
          clearable
          searchable
          maxDropdownHeight={145}
          checkIconPosition="right"
          dropdownOpened={true}
        />
        <Flex justify={"center"} mt={"150px"}>
          <Button onClick={handleShare}>Share</Button>
        </Flex>
      </Modal>
    </>
  );
}
