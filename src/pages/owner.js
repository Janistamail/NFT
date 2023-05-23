import { Box, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { useRouter } from "next/router";
import { useStudents } from "../../hooks/use-students.hook";
import { useEffect, useMemo, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import MyNFT from "../abis/MyNFT.json";
import { Image } from "react-feather";

const owner = () => {
  const router = useRouter();
  const { account } = router.query;
  const { students } = useStudents();
  const [userProfile, setUserProfile] = useState();
  const [nfts, setNFTs] = useState([]);

  const getNFTs = async (tokenId) => {
    try {
      const provider = await detectEthereumProvider();
      window.web3 = new Web3(provider);
      const web3 = window.web3;
      const networkId = await web3.eth.net.getId();
      const networkData = MyNFT.networks[networkId];

      if (networkData) {
        const abi = MyNFT.abi;
        const contractAddress = networkData.address;
        const contract = new web3.eth.Contract(abi, contractAddress);
        if (tokenId) {
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const data = await fetch(tokenURI).then((res) => res.json());
          setNFTs(data?.image);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (account) {
      const data = students?.filter((student) => {
        return student?.wallet_account?.toUpperCase() === account.toUpperCase();
      });
      setUserProfile(data?.[0]);
      getNFTs(data?.[0]?.token_id);
    }
  }, [account, students]);

  return (
    <VStack
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      pt={"135px"}
    >
      <Header />
      <Flex
        borderRadius={"50%"}
        bgColor={"white"}
        w={"700px"}
        h={"150px"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        px={10}
        ml="auto"
      >
        <Text fontSize={"4xl"}>
          {userProfile?.firstname} {userProfile?.lastname}
        </Text>
        <Text fontSize={"md"}>{userProfile?.student_id}</Text>
        <Divider color={"blackAlpha.400"} border={"2px"} my={1} />
        <Text fontSize={"md"}>{userProfile?.wallet_account}</Text>
      </Flex>
      {nfts.length ? (
        <div style={{ marginTop: "30px" }}>
          <img src={nfts} alt={"nft"} />
        </div>
      ) : (
        <HStack pt={"100px"} gap={2}>
          <Image size={50} color="white" />
          <Text fontSize={"4xl"} fontWeight={"bold"} color={"whiteAlpha.800"}>
            No NFT
          </Text>
        </HStack>
      )}

      <Footer />
    </VStack>
  );
};
export default owner;
