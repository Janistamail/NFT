import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  console.log("0-dz", url);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default function useLoginMutation() {
  const { trigger: isAdmin, data: role } = useSWRMutation(
    "/api/login",
    sendRequest
  );

  return { isAdmin, role };
}
