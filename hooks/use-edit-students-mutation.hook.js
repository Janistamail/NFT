import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default function useEditStudentsMutation() {
  const { trigger: editStudent, data } = useSWRMutation(
    "/api/edit",
    sendRequest
  );

  return { editStudent };
}
