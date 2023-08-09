import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default function useSearchMutation() {
  const { trigger: searchCheck, data } = useSWRMutation(
    "/api/check",
    sendRequest
  );

  return { searchCheck, data };
}
