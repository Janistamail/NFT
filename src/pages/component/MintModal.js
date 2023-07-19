import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useMintMutation from "../../../hooks/use-mint.hook";

function MintModal({
  userProfile,
  contract,
  onOpenStatus,
  mutateStudents,
  students,
  setMintStatus,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { triggerMint } = useMintMutation();

  const mintFunc = async () => {
    //global --> login with this account
    onClose();
    onOpenStatus();
    const { token_id, student_id, wallet_account, ipfs_url } = userProfile;
    setMintStatus("loading");

    try {
      const estimatedGas = await contract.methods
        .mint(wallet_account, token_id, ipfs_url)
        .estimateGas({ from: wallet_account });

      const result = await contract.methods
        .mint(wallet_account, token_id, ipfs_url)
        .send({ from: wallet_account, gas: Math.round(estimatedGas * 1.5) });
      console.log(333);

      if (result) {
        console.log(result);
        setMintStatus("success");
        onOpenStatus();
        const newData = students.map((student) => {
          if (student.student_id === userProfile.student_id) {
            student.is_minted = 1;
          }
          return student;
        });
        console.log(newData);
        mutateStudents(newData);
        await triggerMint({
          student_id: student_id,
          mintTo: 1,
        });
      } else {
        console.log("lll");
        setMintStatus("error");
        onOpenStatus();
      }

      //เอา owner ไปเพ่ิม NFTในmetamaskต่อ
      // const NFTOwner = await contract.methods
      //   .ownerOf(index)
      //   .send({ from: admin });
      // console.log("Jack", NFTOwner);
    } catch (e) {
      setMintStatus("error");
      console.log(e);
    }
  };

  return (
    <>
      <Button
        colorScheme="teal"
        size="lg"
        w={"115px"}
        onClick={onOpen}
        disabled={userProfile?.is_minted}
      >
        Mint
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to mint?</ModalHeader>
          <ModalFooter gap={2}>
            <Button onClick={onClose} colorScheme="red" size="lg">
              NO
            </Button>
            <Button onClick={mintFunc} colorScheme="teal" size="lg">
              YES
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MintModal;
