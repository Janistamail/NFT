import useSWRMutation from "swr";
// const myFetch = createFetch("http://127.0.0.1:8000");

const sendRequest = (url, { args }) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
const fetcher = (key) => fetch(key).then((res) => res.json());
export function useIPFSMutation() {
  const { trigger, isMutating } = useSWRMutation("/api/students", sendRequest);
  return { trigger, isMutating };
}
