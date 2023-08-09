import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CheckModal from "./component/CheckModal";
import Footer from "./component/Footer";
import Header from "./component/Header";

export default function check() {
  const [searchName, setSearchName] = useState();
  const searchFunc = (value) => {
    setSearchName(value);
  };

  return (
    <Box
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      justifyContent={"center"}
      pt={"120px"}
    >
      <Header />
      <VStack alignItems={"center"} gap={4} mt={"150px"}>
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
          color={"teal.500"}
        >
          Enter student's name
        </Text>
        <Input
          placeholder="name"
          size="lg"
          w={400}
          borderColor={"teal"}
          onChange={(event) => searchFunc(event.target.value)}
        />
        <CheckModal searchName={searchName} mt={"100px"} />
      </VStack>
      <Footer />
    </Box>
  );
}
