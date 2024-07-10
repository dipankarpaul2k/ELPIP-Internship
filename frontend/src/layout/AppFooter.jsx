import { Box, Center, Divider, Text } from "@mantine/core";

export default function AppFooter() {
  return (
    <Box>
      <Divider my={"sm"} />
      <Center h={"30px"}>
        <Text>Built by Dipankar Paul</Text>
      </Center>
    </Box>
  );
}
