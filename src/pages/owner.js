import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { useRouter } from "next/router";
import { useStudents } from "../../hooks/use-students.hook";
import { useEffect, useMemo, useState } from "react";

const owner = () => {
  const router = useRouter();
  const { account } = router.query;
  const { students } = useStudents();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (account) {
      const data = students?.filter((student) => {
        return student?.wallet_account?.toUpperCase() === account.toUpperCase();
      });
      setUserProfile(data?.[0]);
    }
  }, [account, students]);
  return (
    <VStack
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      p={"150px"}
    >
      <Header />
      <Flex
        borderRadius={"25%"}
        bgColor={"white"}
        w={"700px"}
        h={"300px"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        px={10}
        ml="auto"
      >
        <Text fontSize={"4xl"}>
          {userProfile?.firstname} {userProfile?.lastname}
        </Text>
        <Text fontSize={"2xl"}>{userProfile?.student_id}</Text>
        <Divider color={"blackAlpha.400"} border={"2px"} />
        <Text fontSize={"2xl"}>{userProfile?.wallet_account}</Text>
      </Flex>

      <Footer />
    </VStack>
  );
};
export default owner;
