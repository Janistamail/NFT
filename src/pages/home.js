import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStudents } from "../../hooks/use-students.hook";
import Footer from "./component/Footer";
import Header from "./component/Header";
import StudentTable from "./component/StudentTable";

export default function Home() {
  const { students, isStudentsLoading } = useStudents();
  const [admin, setAdmin] = useState();
  const router = useRouter();
  const [accounts, setAccounts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [contract, setContract] = useState();

  if (isStudentsLoading) <div>...loading</div>;

  // const init = async () => {
  //   const provider = await detectEthereumProvider();
  //   window.web3 = new Web3(provider);
  //   const web3 = window.web3;
  //   const networkId = await web3.eth.net.getId();
  //   const networkData = MyNFT.networks[networkId];

  //   if (networkData) {
  //     const abi = MyNFT.abi;
  //     const contractAddress = networkData.address;
  //     //use web3 to create contract and interact with smart contracts
  //     const contractData = new web3.eth.Contract(abi, contractAddress);
  //     if (contractData) {
  //       const admin = await contractData.methods.admin().call();
  //       setAdmin(admin);
  //       setContract(contractData);
  //       // const _owner = await contract.methods.getOwner().call();
  //     }
  //   } else {
  //     window.alert("Smart contract not deployed");
  //   }
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  return (
    <Box
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      justifyContent={"center"}
    >
      <AlertDialog isOpen={isLoading} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <Image
              src={"/loading.gif"}
              width={600}
              height={600}
              alt="Loading gif"
            ></Image>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Header />

      <StudentTable admin={admin} students={students}>
        <Tooltip
          w="250px"
          h="100px"
          textAlign={"center"}
          pt={8}
          borderRadius={"50%"}
          label="Click to upload all student's certificates to IPFS"
          hasArrow
          placement="left"
          isDisabled={students?.[0]?.url}
        >
          <HStack gap={10} justifyContent="center" mt={70} ml={"auto"} mr={20}>
            <Button
              colorScheme="teal"
              size="lg"
              disabled={students?.[0]?.url}
              onClick={() => {
                setIsLoading(true);
                router.push("about");
              }}
            >
              IPFS Upload
            </Button>
          </HStack>
        </Tooltip>
      </StudentTable>

      <Footer />
    </Box>
  );
}
