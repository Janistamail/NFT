import { Divider, Text, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <VStack
      position={"absolute"}
      bgColor={"#2C7A7B"}
      color={"white"}
      bottom={0}
      w="100%"
      h="100px"
      justifyContent={"center"}
    >
      <Text fontSize={"sm"}>
        This project aims at studying the concepts of A non-fungible token
      </Text>
      <Divider w="60%" />
      <Text fontSize={"sm"}>By Janista Sihirunwong 645162010030</Text>
    </VStack>
  );
};

export default Footer;
