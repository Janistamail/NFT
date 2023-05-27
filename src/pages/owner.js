import { Button, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import useMintMutation from "../../hooks/use-mint.hook";
import { useStudents } from "../../hooks/use-students.hook";
import MyNFT from "../abis/MyNFT.json";
import Footer from "./component/Footer";
import Header from "./component/Header";
import NFTModal from "./component/NFTModal";

const owner = () => {
  const router = useRouter();
  const { account } = router.query;
  const { students } = useStudents();
  const [userProfile, setUserProfile] = useState();
  const { triggerMint } = useMintMutation();
  const [nfts, setNFTs] = useState([]);
  const [certificate, setCertificate] = useState();

  const [contract, setContract] = useState();

  const init = async () => {
    const provider = await detectEthereumProvider();
    window.web3 = new Web3(provider);
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = MyNFT.networks[networkId];

    if (networkData) {
      const abi = MyNFT.abi;
      const contractAddress = networkData.address;
      //use web3 to create contract and interact with smart contracts
      const contractData = new web3.eth.Contract(abi, contractAddress);
      if (contractData) {
        setContract(contractData);
        // const _owner = await contract.methods.getOwner().call();
      }
    } else {
      window.alert("Smart contract not deployed");
    }
  };

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
          await fetch(tokenURI).then(async (res) => {
            const data = await res.json();
            setNFTs(data.image);
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const mintFunc = async ({
    token_id,
    student_id,
    wallet_account,
    ipfs_url,
  }) => {
    //global --> login with this account
    try {
      const estimatedGas = await contract.methods
        .mint(wallet_account, token_id, ipfs_url)
        .estimateGas({ from: wallet_account });

      await contract.methods
        .mint(wallet_account, token_id, ipfs_url)
        .send({ from: wallet_account, gas: Math.round(estimatedGas * 1.5) });

      triggerMint({
        student_id: student_id,
        mintTo: 1,
      });

      //เอา owner ไปเพ่ิม NFTในmetamaskต่อ
      // const NFTOwner = await contract.methods
      //   .ownerOf(index)
      //   .send({ from: admin });
      // console.log("Jack", NFTOwner);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    init();
    if (account) {
      const data = students?.filter((student) => {
        return student?.wallet_account?.toUpperCase() === account.toUpperCase();
      });
      setUserProfile(data?.[0]);

      fetch(data?.[0].ipfs_url).then(async (res) => {
        const data = await res.json();
        setCertificate(data.image);
      });

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
      {certificate && (
        <div style={{ marginTop: "30px" }}>
          <img src={certificate} alt={"nft"} />
        </div>
      )}
      <Flex gap={10} pt={"32px"}>
        <Button
          colorScheme="teal"
          size="lg"
          w={"115px"}
          onClick={() => mintFunc(userProfile)}
          disabled={userProfile?.is_minted}
        >
          Mint
        </Button>
        {/* <Button colorScheme="teal" size="lg" w={"115px"}>
          My NFT
        </Button> */}
        <NFTModal nfts={nfts} />
      </Flex>
      <Footer />
    </VStack>
  );
};
export default owner;
