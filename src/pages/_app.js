import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { STUDENT } from '../../constants/students';


export const StudentContext = createContext();
export default function App({ Component, pageProps }) {
  const [students, setStudents] = useState(STUDENT);

  return <ChakraProvider>
    <StudentContext.Provider value={{ students, setStudents }} >
      <Component {...pageProps} />

    </StudentContext.Provider>
  </ChakraProvider>
}
