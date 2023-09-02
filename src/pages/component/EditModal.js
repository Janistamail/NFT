import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import useEditStudentsMutation from "../../../hooks/use-edit-students-mutation.hook";

const EditModal = ({ mutateStudents, student, students }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { editStudent } = useEditStudentsMutation();
  const [isError, setIsError] = useState(false);
  function validateField(value) {
    let error;
    if (value === "") {
      error = "* required";
    }
    return error;
  }

  const handleSubmit = async (data, primaryKey) => {
    const newData = { ...data, primaryKey: Number(primaryKey) };
    const { status } = await editStudent(newData);
    if (status === 409) {
      setIsError(true);
    } else {
      await mutateStudents([data, ...students]);
      setIsError(false);
      onClose();
    }
  };
  return (
    <>
      <Button
        colorScheme="teal"
        size={"sm"}
        onClick={() => {
          onOpen();
          setIsError(false);
        }}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {isError && (
              <Alert status="error" my={4}>
                <AlertIcon />
                Not successful!
              </Alert>
            )}
            <Formik
              initialValues={{
                id: student.student_id,
                wallet: student.wallet_account,
                firstname: student.firstname,
                lastname: student.lastname,
              }}
              onSubmit={(values, actions) => handleSubmit(values, student.id)}
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
                    size="sm"
                    mr={2}
                    type="submit"
                  >
                    Edit
                  </Button>
                  <Button onClick={onClose} colorScheme="red" size="sm" mt={4}>
                    Cancel
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

export default EditModal;
