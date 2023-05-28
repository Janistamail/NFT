import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

function StatusModal({ onCloseStatus, isOpenStatus, isMintSuccess }) {
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
            status={isMintSuccess ? "success" : "error"}
            w={"25%"}
            onCloseStatus={onCloseStatus}
          >
            <AlertIcon />
            <Box mr="auto">
              <AlertTitle>
                {isMintSuccess ? "Success!" : "Something went wrong!"}
              </AlertTitle>
              <AlertDescription>
                {isMintSuccess
                  ? "Your certificate has been minted."
                  : "There was an error processing your request."}
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
