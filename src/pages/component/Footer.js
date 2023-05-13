import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => {
  return (
    <VStack
      position={"absolute"}
      bgColor={"#2C7A7B"}
      bottom={0}
      w="100%"
      h="150px"
      justifyContent={"center"}
    >
      <p>This project aims at studying the concepts of A non-fungible token</p>
      <Divider borderColor={"black"} w="60%" />
      <p>By Janista Sihirunwong 645162010030</p>
    </VStack>
  );
};

export default Footer;
