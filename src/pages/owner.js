import { Divider, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useIPFSMutation from "../../hooks/use-ipfs.hook";
import useLoginMutation from "../../hooks/use-login-mutation.hook";
import useStudentsMutation from "../../hooks/use-students-mutation.hook";
import { useStudents } from "../../hooks/use-students.hook";
import { navigateLogin } from "../../utils/navigateLogin";
import MyNFT from "../abis/MyNFT.json";
import Footer from "./component/Footer";
import Header from "./component/Header";
import MintModal from "./component/MintModal";
import NFTModal from "./component/NFTModal";
import StatusModal from "./component/StatusModal";
import LoadingGif from "./component/loadingGif";

const owner = () => {
  const router = useRouter();
  const { account } = router.query;
  const { students, mutateStudents } = useStudents();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isOpen: isOpenStatus,
    onClose: onCloseStatus,
    onOpen: onOpenStatus,
  } = useDisclosure();

  const [certificate, setCertificate] = useState();
  const [contract, setContract] = useState();
  const { triggerIPFSUpload } = useIPFSMutation();
  const { triggerUploadIPFS } = useStudentsMutation();
  const [mintStatus, setMintStatus] = useState();
  const { isAdmin } = useLoginMutation();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const init = async () => {
    const { web3, connectedWallet } = await navigateLogin();

    const loginRole = async () => {
      const { role } = await isAdmin({
        login_account: connectedWallet,
      });
      setIsAuthorized(role === "student");
      if (role !== "student") {
        router.push("/notAuthorized");
      }
    };
    loginRole();

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
      {isAuthorized ? (
        <>
          <StatusModal
            onCloseStatus={onCloseStatus}
            isOpenStatus={isOpenStatus}
            mintStatus={mintStatus}
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
              setMintStatus={setMintStatus}
            />
            <NFTModal tokenId={userProfile?.token_id} contract={contract} />
          </Flex>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </VStack>
  );
};
export default owner;
