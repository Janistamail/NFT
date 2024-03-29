import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  console.log(arg);

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default function useAddStudentsMutation() {
  const { trigger: addstudent } = useSWRMutation("/api/add", sendRequest);

  return { addstudent };
}
