import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

function StatusModal({ onCloseStatus, isOpenStatus, mintStatus }) {
  return (
    <>
      {isOpenStatus && (
        <Flex
          w={"100%"}
          justifyContent={"flex-end"}
          position={"fixed"}
          zIndex={2}
        >
          <Alert
            status={
              mintStatus === "success"
                ? "success"
                : mintStatus === "error"
                ? "error"
                : "info"
            }
            w={"25%"}
            onCloseStatus={onCloseStatus}
          >
            <AlertIcon />
            <Box mr="auto">
              <AlertTitle>
                {mintStatus === "success"
                  ? "Success!"
                  : mintStatus === "error"
                  ? "Something went wrong!"
                  : ""}
              </AlertTitle>
              <AlertDescription>
                {mintStatus === "success"
                  ? "Your certificate has been minted."
                  : mintStatus === "error"
                  ? "There was an error processing your request."
                  : "loading..."}
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onCloseStatus}
            />
          </Alert>
        </Flex>
      )}
    </>
  );
}

export default StatusModal;
