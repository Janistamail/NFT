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

export default function useMintMutation() {
  const { trigger: triggerMint, isMutating } = useSWRMutation(
    "/api/mint",
    sendRequest
  );

  return { triggerMint, isMutating };
}
