import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import Image from "next/image";

const LoadingGif = ({ isLoading }) => (
  <AlertDialog isOpen={isLoading} isCentered>
    <AlertDialogOverlay>
      <AlertDialogContent>
        <Image
          priority
          src={"/loading.gif"}
          width={600}
          height={600}
          alt="Loading gif"
        />
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);

export default LoadingGif;
