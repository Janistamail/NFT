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
import useSearchCheckMutation from "../../../hooks/use-search-mutation.hook";
const CheckModal = ({ searchName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchCheck, graduatedData } = useSearchCheckMutation();

  const handleOnClick = async () => {
    const splitName = searchName.split(" ");
    const data = await searchCheck({
      firstname: splitName[0],
      lastname: splitName[1],
    });
    console.log({ data, graduatedData });
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
          {/* <ModalBody>
            {nfts.length ? (
              <div>
                <img src={nfts} alt={"nft"} />
              </div>
            ) : (
              "No NFT"
            )}
          </ModalBody> */}

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
