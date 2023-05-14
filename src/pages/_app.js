import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { STUDENT } from "../../constants/students";

export const StudentContext = createContext();
export default function App({ Component, pageProps }) {
  const [students, setStudents] = useState(STUDENT);
  const fetcher = (url, payload) => {
    const options = {
      method: payload ? "POST" : "GET",
      ...(payload && { body: payload }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(url, options).then((res) => res.json());
  };

  return (
    <ChakraProvider>
      <StudentContext.Provider value={{ students, setStudents }}>
        <Component {...pageProps} />
      </StudentContext.Provider>
    </ChakraProvider>
  );
}
