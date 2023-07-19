import { Button, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import useLoginMutation from "../../hooks/use-login-mutation.hook";
import { navigateLogin, web3_check_metamask } from "../../utils/navigateLogin";
import Footer from "./component/Footer";
import Header from "./component/Header";

export default function Login() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin } = useLoginMutation();

  const loginRole = async () => {
    const { web3, connectedWallet } = await navigateLogin();
    const ganacheAccounts = await web3.eth.getAccounts(); //IMPROVE:
    const { role } = await isAdmin({
      login_account: ganacheAccounts[0],
    });

    if (role === "admin") {
      router.push("/home");
    } else if (role === "student") {
      router.push({ pathname: "/owner", query: { account: connectedWallet } });
    } else {
      router.push("/notAuthorized");
    }
  };

  return (
    <VStack
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      justifyContent={"center"}
    >
      <Header />
      <Tooltip
        placement="right"
        hasArrow
        label={
          web3_check_metamask() ? (
            <Text
              fontSize="3xl"
              textAlign={"center"}
              style={{ marginTop: "35px" }}
            >
              Installed
            </Text>
          ) : (
            <Text
              fontSize="3xl"
              textAlign={"center"}
              style={{ marginTop: "35px" }}
            >
              Not Installed
            </Text>
          )
        }
        w="400px"
        h="120px"
        borderRadius={"80%"}
      >
        <HStack
          justifyContent={"center"}
          mt="150px"
          border="4px solid #38B2AC"
          bgColor={"#F0FFF4"}
          borderRadius="80px"
          cursor={"pointer"}
          w="850px"
          h="200px"
          p="50px"
        >
          <Text fontSize={"3xl"}>Hover here to detect Metamask extension</Text>
          {/* <Image src="/detect.gif" alt="Metamask" width="200" height="200" /> */}
        </HStack>
      </Tooltip>
      <VStack
        cursor={"pointer"}
        border="4px solid #2C7A7B"
        borderRadius="80px"
        w="850px"
        h="200px"
        p="50px"
        bgColor={"#F0FFF4"}
        justifyContent={"center"}
        onMouseOver={() => setShowLogin(true)}
        onMouseOut={() => setShowLogin(false)}
      >
        <HStack>
          <Text fontSize={"3xl"}>
            Metamask wallet Login extension &nbsp; ➡️ &nbsp;
          </Text>
          <Button colorScheme="teal" onClick={() => loginRole()}>
            Login
          </Button>
          {/* {showLogin && (
            <Image src="/door-lock.gif" alt="Login" width="100" height="100" />
          )} */}
        </HStack>
      </VStack>
      <Footer />
    </VStack>
  );
}
