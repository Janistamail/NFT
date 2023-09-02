import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import useDeleteStudentsMutation from "../../../hooks/use-delete-students-mutation.hook";

const DeleteModal = ({ mutateStudents, wallet, students }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteStudent } = useDeleteStudentsMutation();
  const handleDelete = async () => {
    const newData = students.filter(
      (student) => student.wallet_account !== wallet
    );
    await deleteStudent({
      wallet: wallet,
    });
    await mutateStudents([newData]);

    onClose();
  };

  return (
    <>
      <Button
        ml={2}
        colorScheme="red"
        size={"sm"}
        onClick={async () => {
          onOpen();
        }}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader>
            <Text>Are you sure you want to delete?</Text>
          </ModalHeader>
          <ModalBody>
            <Button
              colorScheme="red"
              size={"sm"}
              onClick={() => handleDelete()}
            >
              Yes
            </Button>
            <Button
              ml={2}
              colorScheme="teal"
              size={"sm"}
              onClick={() => onClose()}
            >
              No
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
