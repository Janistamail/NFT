import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { navigateLogin } from "../../../utils/navigateLogin";
import MyNFT from "../../abis/MyNFT.json";
import useSearchMutation from "../../../hooks/use-search-mutation.hook";

const CheckModal = ({ searchName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchCheck } = useSearchMutation();
  const [nft, setNFT] = useState(null);
  const [contract, setContract] = useState();

  const init = async () => {
    const { web3, connectedWallet } = await navigateLogin();

    const networkId = await web3.eth.net.getId();
    const networkData = MyNFT.networks[networkId];

    if (networkData) {
      const abi = MyNFT.abi;
      const contractAddress = networkData.address;
      const contractData = new web3.eth.Contract(abi, contractAddress);
      if (contractData) {
        setContract(contractData);
      }
    } else {
      window.alert("Smart contract not deployed");
    }
  };

  const handleOnClick = async () => {
    const splitName = searchName ? searchName.split(" ") : "";
    const data = await searchCheck({
      firstname: splitName[0],
      lastname: splitName[1],
    });
    try {
      if (data?.token_id) {
        const tokenURI = await contract.methods.tokenURI(data.token_id).call();
        await fetch(tokenURI).then(async (res) => {
          const data = await res.json();
          setNFT(data.image);
        });
      }
    } catch (e) {
      setNFT(null);
      console.log("This tokenID hasn't been minted yet");
    }
    onOpen();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Button onClick={handleOnClick} colorScheme="teal" size="lg" w={"115px"}>
        Search
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certificate</ModalHeader>
          <ModalBody>
            {nft ? (
              <div>
                <img src={nft} alt={"nft"} />
              </div>
            ) : (
              "No NFT"
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal" size="lg">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckModal;
