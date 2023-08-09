import { Box, Button, HStack, Text } from "@chakra-ui/react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { useRouter } from "next/router";

export default function notAuthorized() {
  const router = useRouter();
  return (
    <Box
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      justifyContent={"center"}
      pt={"120px"}
    >
      <Header />
      <Text
        textAlign={"center"}
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={"teal.500"}
        mt={"200px"}
      >
        You have not been authorized. <br /> Please contact xx-xxxxxxxx to check
        your Authorization.
      </Text>
      <HStack justifyContent={"center"} mt="50px">
        <Button
          onClick={() => router.push("/")}
          color={"white"}
          bgColor={"teal.500"}
          size={"lg"}
        >
          Home
        </Button>
        <Button
          onClick={() => router.push("/check")}
          color={"white"}
          bgColor={"teal.500"}
          size={"lg"}
        >
          Search student's certicifate
        </Button>
      </HStack>

      <Footer />
    </Box>
  );
}
