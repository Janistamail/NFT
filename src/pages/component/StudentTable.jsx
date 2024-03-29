import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useDeleteStudentsMutation from "../../../hooks/use-delete-students-mutation.hook";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const OverFlowText = ({ children, label }) => {
  return (
    <Tooltip
      label={label ?? "-"}
      hasArrow
      placement="bottom-start"
      borderRadius={"10px"}
      p="12px"
    >
      <Td maxW="200px" w={200}>
        <div
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: "200px",
          }}
        >
          {label ?? "-"}
        </div>
      </Td>
    </Tooltip>
  );
};

const StudentTable = ({ children, students, mutateStudents }) => {
  const router = useRouter();
  const { isOpen, onClose } = useDisclosure();
  const { deleteStudent } = useDeleteStudentsMutation();
  const [editStudentAccount, setEditStudentAccount] = useState("");
  const onDiscard = () => {
    onClose();
    setEditStudentAccount("");
  };

  const handleOnInputChange = (e) => {
    const newData = { ...editStudentAccount };
    newData.account = e.target.value;
    setEditStudentAccount(newData);
  };

  return (
    <VStack pt={"50px"} gap={5}>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit ETH Account</ModalHeader>
          <ModalBody>
            <FormControl>
              <Input
                value={editStudentAccount?.account}
                onChange={handleOnInputChange}
              ></Input>
            </FormControl>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={onDiscard}>Discard</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}

      <Text fontSize="4xl" color={"teal.400"} fontWeight="bold">
        Diplomates who graduated and will receive graduation certificate
      </Text>
      <TableContainer
        maxW={"80%"}
        w="1500px"
        overflowX={"hidden"}
        overflowY={"auto"}
        h="500px"
      >
        <Table variant="striped" colorScheme="teal" size={"sm"}>
          <Thead height={"50px"} bgColor={"teal.400"}>
            <Tr>
              <Th fontSize="lg">No.</Th>
              <Th fontSize="lg">ID</Th>
              <Th fontSize="lg">ETH account</Th>
              <Th fontSize="lg">Firstname</Th>
              <Th fontSize="lg">Lastname</Th>
              <Th fontSize="lg">Certificate</Th>
              <Th fontSize="lg">Mint</Th>
              <Th fontSize="lg">Others</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students?.map((student, index) => (
              <Tr key={student.id} h={"65px"}>
                <Td w={"60px"} fontSize={"md"}>
                  {index + 1}
                </Td>
                <Td
                  fontSize={"md"}
                  w={"140px"}
                  _hover={{ color: "teal.500" }}
                  cursor="pointer"
                  onClick={() => {
                    router.push({
                      pathname: `/student/${student.student_id}`,
                    });
                  }}
                >
                  {student.student_id}
                </Td>
                <OverFlowText label={student?.wallet_account}></OverFlowText>
                <Td fontSize={"md"} w={"110px"}>
                  {student.firstname}
                </Td>
                <Td fontSize={"md"} w={"110px"}>
                  {student.lastname}
                </Td>
                <OverFlowText label={student?.ipfs_url}></OverFlowText>
                <Td fontSize={"md"} alignItems={"center"} w={"65px"}>
                  {student?.is_minted === 0 ? (
                    <Text color={"red.400"} fontSize={"xl"} fontWeight={"bold"}>
                       ❌
                    </Text>
                  ) : (
                    <Text color={"red.400"} fontSize={"xl"} fontWeight={"bold"}>
                      ✅
                    </Text>
                  )}
                </Td>
                <Td fontSize={"md"} w={"110px"}>
                  <EditModal
                    student={student}
                    mutateStudents={mutateStudents}
                    students={students}
                  />
                  <DeleteModal
                    wallet={student.wallet_account}
                    mutateStudents={mutateStudents}
                    students={students}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default StudentTable;
