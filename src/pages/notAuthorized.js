import { Box, Input, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";

export default function notAuthorized() {
  const router = useRouter();
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
      <VStack alignItems={"center"} gap={10}>
        <Input
          placeholder="name"
          size="lg"
          w={400}
          mt={70}
          borderColor={"teal"}
          onChange={(event) => searchFunc(event.target.value)}
        />
        {/* <CheckModal searchName={searchName} /> */}

        {/* <Text fontSize={"3xl"} textAlign={"center"} pt={"220px"} color={"teal"}>
          You are <b>not</b> authorized to access this web application! <br />
          Please contact <b>xx-xxxxxxx</b> to verify your identity.
        </Text>
        <Button
          onClick={() => router.push("/")}
          colorScheme="teal"
          size={"lg"}
          w={"150px"}
        >
          Back
        </Button> */}
      </VStack>
      <Footer />
    </Box>
  );
}
