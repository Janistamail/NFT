import { Divider, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import useIPFSMutation from "../../hooks/use-ipfs.hook";
import useStudentsMutation from "../../hooks/use-students-mutation.hook";
import { useStudents } from "../../hooks/use-students.hook";
import MyNFT from "../abis/MyNFT.json";
import Footer from "./component/Footer";
import Header from "./component/Header";
import MintModal from "./component/MintModal";
import NFTModal from "./component/NFTModal";
import LoadingGif from "./component/loadingGif";
import StatusModal from "./component/StatusModal";

const owner = () => {
  const router = useRouter();
  const { account } = router.query;
  const { students, mutateStudents } = useStudents();
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {
    isOpen: isOpenStatus,
    onClose: onCloseStatus,
    onOpen: onOpenStatus,
  } = useDisclosure();

  // const [nfts, setNFTs] = useState([]);
  const [certificate, setCertificate] = useState();
  const [contract, setContract] = useState();
  const { triggerIPFSUpload } = useIPFSMutation();
  const { triggerUploadIPFS } = useStudentsMutation();
  const [isMintSuccess, setIsMintSuccess] = useState();

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

  const uploadIPFS = async (data) => {
    if (!data?.ipfs_url) {
      //gen Image
      const uploadData = await triggerIPFSUpload({
        student_id: data?.student_id,
      });
      if (uploadData) {
        const dd = await triggerUploadIPFS(uploadData);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    init();

    if (account) {
      const data = students?.filter((student) => {
        return student?.wallet_account?.toUpperCase() === account.toUpperCase();
      });
      setUserProfile(data?.[0]);
      uploadIPFS(data?.[0]);

      fetch(data?.[0].ipfs_url).then(async (res) => {
        const data = await res.json();
        setCertificate(data.image);
      });
    }
  }, [account, students]);

  return (
    <VStack
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      pt={"150px"}
    >
      <Header />
      <StatusModal
        onCloseStatus={onCloseStatus}
        isOpenStatus={isOpenStatus}
        isMintSuccess={isMintSuccess}
      />
      <LoadingGif isLoading={isLoading} />
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
        <MintModal
          userProfile={userProfile}
          contract={contract}
          onOpenStatus={onOpenStatus}
          mutateStudents={mutateStudents}
          students={students}
          setIsMintSuccess={setIsMintSuccess}
        />
        <NFTModal tokenId={userProfile?.token_id} contract={contract} />
      </Flex>
      <Footer />
    </VStack>
  );
};
export default owner;
