import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function NFTModal({ nfts }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Text
                fontSize={"4xl"}
                fontWeight={"bold"}
                color={"whiteAlpha.800"}
              >
                No NFT
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={onClose}
              colorScheme="teal"
              size="lg"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NFTModal;
