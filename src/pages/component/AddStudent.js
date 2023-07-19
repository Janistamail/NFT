import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import useAddStudentsMutation from "../../../hooks/use-add-students-mutation.hook";
import { useState } from "react";

const AddStudent = ({ mutateStudents, students }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addstudent } = useAddStudentsMutation();
  const [isError, setIsError] = useState(false);
  function validateField(value) {
    let error;
    if (value === "") {
      error = "* required";
    }
    return error;
  }

  const handleSubmit = async (data) => {
    const { status } = await addstudent(data);
    if (status === 409) {
      setIsError(true);
    } else {
      await mutateStudents([...students, data]);
      setIsError(false);
      onClose();
    }
  };

  return (
    <>
      <Flex justifyContent={"flex-end"} pt={5} pr={10}>
        <Tooltip
          label="Click here to add new student."
          hasArrow
          arrowSize={12}
          borderRadius={4}
          placement="left"
          w={"300px"}
          h={"40px"}
          textAlign={"center"}
          pt={2}
        >
          <Button
            colorScheme="teal"
            size={"lg"}
            w={"150px"}
            onClick={() => {
              onOpen();
              setIsError(false);
            }}
          >
            Add
          </Button>
        </Tooltip>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please fill the form</ModalHeader>
          <ModalBody>
            {isError && (
              <Alert status="error">
                <AlertIcon />
                This account has been already added or this account has not been
                authorized yet.
              </Alert>
            )}
            <Formik
              initialValues={{
                id: "",
                wallet: "",
                firstname: "",
                lastname: "",
              }}
              onSubmit={(values, actions) => handleSubmit(values)}
            >
              {(props) => (
                <Form>
                  <Field name="id" validate={validateField}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.id && form.touched.id}
                      >
                        <FormLabel>ID</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="wallet" validate={validateField}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.wallet && form.touched.wallet}
                      >
                        <FormLabel mt={2}>ETH Wallet</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.wallet}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="firstname" validate={validateField}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.firstname && form.touched.firstname
                        }
                      >
                        <FormLabel mt={2}>Firstname</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.firstname}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastname" validate={validateField}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.lastname && form.touched.lastname
                        }
                      >
                        <FormLabel mt={2}>Lastname</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.lastname}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStudent;
