import { Box, Button, Flex } from "@chakra-ui/react";
import { useStudents } from "../../hooks/use-students.hook";
import Footer from "./component/Footer";
import Header from "./component/Header";
import StudentTable from "./component/StudentTable";
import { useEffect, useState } from "react";
import { navigateLogin } from "../../utils/navigateLogin";
import { useRouter } from "next/router";
import useLoginMutation from "../../hooks/use-login-mutation.hook";
import AddStudent from "./component/AddStudent";

export default function Home() {
  const { students, isStudentsLoading, mutateStudents } = useStudents();
  const router = useRouter();
  const { isAdmin } = useLoginMutation();
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (isStudentsLoading) <div>...loading</div>;

  useEffect(() => {
    const loginRole = async () => {
      const { web3, connectedWallet } = await navigateLogin();
      const { role } = await isAdmin({
        login_account: connectedWallet,
      });
      setIsAuthorized(role === "admin");
      if (role !== "admin") {
        router.push("/notAuthorized");
      }
    };
    loginRole();
  }, []);

  return (
    <Box
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      justifyContent={"center"}
      pt={"120px"}
    >
      <Header />
      {isAuthorized ? (
        <>
          {/* <Flex justifyContent={"flex-end"} pt={10} pr={12}>
            <Button colorScheme="teal" size={"lg"} w={"150px"}>
              Add
            </Button>
          </Flex> */}
          <AddStudent students={students} mutateStudents={mutateStudents} />
          <StudentTable students={students}></StudentTable>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </Box>
  );
}
