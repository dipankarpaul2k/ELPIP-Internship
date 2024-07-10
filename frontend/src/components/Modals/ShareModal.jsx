import { Button, Flex, Modal, MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";
import { getAllUsernames } from "../../api/authApi";

export default function ShareModal({ isOpened, onClose, handleShare, shareWithUsernames, setShareWithUsernames }) {
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
      <Modal opened={isOpened} onClose={onClose} title="Share Task" centered>
        <MultiSelect
          label="Who do you want to share this task with?"
          placeholder="Search usernames"
          clearable
          searchable
          data={usernames}
          value={shareWithUsernames}
          onChange={setShareWithUsernames}
          limit={5}
          maxDropdownHeight={200}
        />
        <Flex justify={"center"} mt={"sm"}>
          <Button onClick={handleShare}>Share</Button>
        </Flex>
      </Modal>
    </>
  );
}
