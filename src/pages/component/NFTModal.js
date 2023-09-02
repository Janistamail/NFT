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

function NFTModal({ tokenId, contract }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const getNFTs = async () => {
      try {
        if (tokenId) {
          const tokenURI = await contract.methods.tokenURI(tokenId).call();

          await fetch(tokenURI).then(async (res) => {
            const data = await res.json();
            setNFTs(data.image);
          });
        }
      } catch (e) {
        console.log("This tokenID hasn't been minted yet");
      }
    };
    getNFTs();
  }, [tokenId, contract]);

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="lg" w={"115px"}>
        My NFT
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certificate</ModalHeader>
          <ModalBody>
            {nfts.length ? (
              <div>
                <img src={nfts} alt={"nft"} />
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
}

export default NFTModal;
