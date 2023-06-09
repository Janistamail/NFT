import { Button, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import detectEthereumProvider from "@metamask/detect-provider";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Web3 from "web3";
import useLoginMutation from "../../hooks/use-login-mutation.hook";
import Footer from "./component/Footer";
import Header from "./component/Header";

const devMode = false; //metamask = false
export default function Login() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin } = useLoginMutation();
  const loadBlockchainData = async (web3, connectedWallet) => {
    const ganacheAccounts = await web3.eth.getAccounts(); //IMPROVE:
    const isAdminAccount = await isAdmin({
      login_account: ganacheAccounts[0],
    });

    if (isAdminAccount) {
      router.push("/home");
    } else {
      router.push({ pathname: "/owner", query: { account: connectedWallet } });
    }
  };
  //----------------------------------------------
  function web3_check_metamask() {
    if (typeof window !== "undefined") {
      return !window.ethereum ? false : true;
    }
  }

  async function web3_metamask_login() {
    // Check first if the user has the MetaMask installed
    if (devMode) {
      //10 accounts
      const web3 = new Web3(
        new Web3.providers.WebsocketProvider("ws://localhost:7545")
      );
    } else {
      //metamask
      if (web3_check_metamask()) {
        const provider = await detectEthereumProvider();
        if (provider) {
          console.log("ethereum wallet is connected");
          window.web3 = new Web3(provider);
          const web3 = window.web3;
          ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async (connectedWallet) => {
              await loadBlockchainData(web3, connectedWallet[0]);
            });
        } else {
          console.log("no ethereum wallet detected (no provider)");
        }
      }
    }
  }

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
          <Image src="/detect.gif" alt="Metamask" width="200" height="200" />
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
          <Button colorScheme="teal" onClick={() => web3_metamask_login()}>
            Login
          </Button>
          {showLogin && (
            <Image src="/door-lock.gif" alt="Login" width="100" height="100" />
          )}
        </HStack>
      </VStack>
      <Footer />
    </VStack>
  );
}
