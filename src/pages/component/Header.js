import { HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <HStack
      position={"absolute"}
      alignItems={"center"}
      bgColor={"#2C7A7B"}
      top={0}
      w="100%"
      h="120px"
    >
      <Image
        priority
        src="/metaMask.svg.webp"
        alt="Metamask"
        width="280"
        height="280"
        style={{ marginTop: "170px", cursor: "pointer" }}
        onClick={() => router.push("/")}
      />
      <Text
        fontSize={"6xl"}
        color={"white"}
        style={{
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "30px",
          fontFamily: "fantasy",
        }}
      >
        NFT CERTIFICATE
      </Text>
    </HStack>
  );
};

export default Header;
