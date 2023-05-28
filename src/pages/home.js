import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStudents } from "../../hooks/use-students.hook";
import Footer from "./component/Footer";
import Header from "./component/Header";
import StudentTable from "./component/StudentTable";
import LoadingGif from "./component/loadingGif";

export default function Home() {
  const { students, isStudentsLoading } = useStudents();
  if (isStudentsLoading) <div>...loading</div>;

  return (
    <Box
      bgColor={"#81E6D9"}
      height={"100vh"}
      position={"relative"}
      justifyContent={"center"}
      pt={"120px"}
    >
      <Header />
      <StudentTable students={students}></StudentTable>
      <Footer />
    </Box>
  );
}
