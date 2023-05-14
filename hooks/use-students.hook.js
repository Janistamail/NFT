import useSWR from "swr";

// const myFetch = createFetch("http://127.0.0.1:8000");

const fetcher = (key) => fetch(key).then((res) => res.json());

export function useStudents() {
  const { data: students, isLoading: isStudentsLoading } = useSWR(
    "/api/students",
    fetcher
  );
  return { students, isStudentsLoading };
}
