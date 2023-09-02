import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: "DELETE",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default function useDeleteStudentsMutation() {
  const { trigger: deleteStudent } = useSWRMutation("/api/delete", sendRequest);

  return { deleteStudent };
}
