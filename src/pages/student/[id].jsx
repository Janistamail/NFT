import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useStudents } from "../../../hooks/use-students.hook";

const StudentPage = () => {
  const router = useRouter();
  const { students } = useStudents();
  const { id } = router.query;

  const value = useMemo(() => {
    return students?.filter((student) => {
      if (student.student_id === id) {
        return student;
      }
    });
  }, [id]);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} mt={"60px"}>
      {value && (
        <Box
          position={"relative"}
          style={{
            backgroundImage: `url("/certificate.jpeg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "410px",
            height: "300px",
          }}
        >
          <Text
            color="black"
            fontSize={"xl"}
            fontWeight="bold"
            top={"200px"}
            left={"294px"}
            style={{ position: "sticky" }}
            textAlign={"center"}
          >
            {`${value[0]?.firstname} ${value[0]?.lastname}`}
          </Text>
        </Box>
      )}
    </Flex>
  );
};
export default StudentPage;
