import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
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
        <Flex>
          {children}
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
        </Flex>
      </Td>
    </Tooltip>
  );
};

const StudentTable = ({ children, admin, contract, students }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editStudentAccount, setEditStudentAccount] = useState("");
  // const onSaveAccount = () => {
  //   onClose();
  //   const newData = students.map((s) => {
  //     if (s.id === editStudentAccount.id) {
  //       s.account = editStudentAccount.account;
  //     }
  //     return s;
  //   });
  //   setStudents(newData);
  // };

  const onDiscard = () => {
    onClose();
    setEditStudentAccount("");
  };

  const handleOnInputChange = (e) => {
    const newData = { ...editStudentAccount };
    newData.account = e.target.value;
    setEditStudentAccount(newData);
  };

  const mintFunc = async (index) => {
    console.log(index);
    //global --> login with this account
    try {
      await contract.methods
        .mint(students[index].account, index, students[index].url)
        .send({ from: admin, gas: "1000000" });

      //เอา owner ไปเพ่ิม NFTในmetamaskต่อ
      const NFTOwner = await contract.methods
        .ownerOf(index)
        .send({ from: admin });
      console.log("Jack", NFTOwner);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack pt={100} gap={5}>
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
            {/* <Button colorScheme="teal" onClick={onSaveAccount}>
              Save
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}

      <Text fontSize="4xl" color={"teal.400"} fontWeight="bold">
        Students who graduated and will receive graduation certificate in 2000
      </Text>
      <TableContainer maxW={"80%"} w="1500px" overflowX={"hidden"}>
        <Table variant="striped" colorScheme="teal" size={"sm"}>
          <Thead height={"50px"}>
            <Tr>
              <Th fontSize="lg">No.</Th>
              <Th fontSize="lg">ID</Th>
              <Th fontSize="lg">ETH account</Th>
              <Th fontSize="lg">Firstname</Th>
              <Th fontSize="lg">Lastname</Th>
              <Th fontSize="lg">Certificate</Th>
              <Th fontSize="lg">Verified</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students?.map((student, index) => (
              <Tr key={student.id}>
                <Td w={"60px"} fontSize={"md"}>
                  {student.tokenId}
                </Td>
                <Td
                  fontSize={"md"}
                  w={"140px"}
                  _hover={{ color: "teal.500" }}
                  cursor="pointer"
                  onClick={() => {
                    router.push({
                      pathname: `/student/${student.tokenId}`,
                    });
                  }}
                >
                  {student.id}
                </Td>
                <OverFlowText label={student?.account}>
                  <EditIcon
                    mr={2}
                    color={"red.500"}
                    cursor={"pointer"}
                    onClick={() => {
                      setEditStudentAccount({ ...student });
                      onOpen();
                    }}
                  />
                </OverFlowText>
                <Td fontSize={"md"} w={"110px"}>
                  {student.name}
                </Td>
                <Td fontSize={"md"} w={"110px"}>
                  {student.lastname}
                </Td>
                <OverFlowText label={student?.url}></OverFlowText>
                <Td fontSize={"md"}>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => mintFunc(index + 1)}
                  >
                    Mint
                  </Button>
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
