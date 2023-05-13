import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Background from "../component/background";
import Title from "../component/Title";
import { STUDENT as data } from "../../../constants/students";
import Image from "next/image";

// const image = "https://images.unsplash.com/photo-1555448248-2571daf6344b?w=1920&q=100";
// const image =
//   "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/colorful-certificate-template-design-99272dc1fa74cf2a930d82288e04a672_screen.jpg?ts=1604582219";

const StudentPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const value = useMemo(() => {
    return data.filter((student) => {
      if (student.tokenId === id) {
        console.log(student);
        return student;
      }
    });
  }, [id]);

  return (
    <>
      {value && (
        <>
          <Flex
            width="50%"
            height="50%"
            justifyContent={"center"}
            position={"relative"}
          >
            <Image
              src={"/certificate.jpeg"}
              width={1000}
              height={800}
              alt="certificate"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <VStack
              alignItems={"center"}
              position={"absolute"}
              top={"440px"}
              left={"400px"}
              width={"600px"}
              height={"150px"}
            >
              <Text>jdskl</Text>
              <Text color="black" fontSize={"3xl"} fontWeight="bold">
                {value[0]?.id}
              </Text>
              <Text color="black" fontSize={"4xl"} fontWeight="bold">
                {`${value[0]?.name} ${value[0]?.lastname}`}
              </Text>
            </VStack>
          </Flex>
        </>
      )}
    </>
  );
};
export default StudentPage;
