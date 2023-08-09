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
import useSearchCheckMutation from "../../../hooks/use-search-mutation.hook";
import { useState } from "react";
const CheckModal = ({ searchName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchCheck } = useSearchCheckMutation();
  const [nft, setNFT] = useState(null);

  const handleOnClick = async () => {
    const splitName = searchName ? searchName.split(" ") : "";
    const data = await searchCheck({
      firstname: splitName[0],
      lastname: splitName[1],
    });
    if (data.ipfs_url) {
      await fetch(data.ipfs_url).then(async (res) => {
        const nftImg = await res.json();
        setNFT(nftImg.image);
      });
    } else {
      setNFT(null);
    }
    onOpen();
  };

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
