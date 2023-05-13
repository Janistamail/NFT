import { Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function Title({ value }) {
  return (
    <VStack alignItems={"center"}>
      <Text color="black" fontSize={"5xl"} fontWeight="bold">
        {value[0]?.id}
      </Text>
      <Text color="black" fontSize={"5xl"} fontWeight="bold">
        {`${value[0]?.name} ${value[0]?.lastname}`}
      </Text>
    </VStack>
  );
}
