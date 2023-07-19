import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  console.log(url);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default function useSearchCheckMutation() {
  const { trigger: searchCheck, data: graduatedData } = useSWRMutation(
    "/api/search",
    sendRequest
  );

  return { searchCheck, graduatedData };
}
