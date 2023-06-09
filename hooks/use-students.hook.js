import useSWR from "swr";

const fetcher = (key) => fetch(key).then((res) => res.json());

export function useStudents() {
  const {
    data: students,
    isLoading: isStudentsLoading,
    mutate: mutateStudents,
  } = useSWR("/api/students", fetcher);
  return { students, isStudentsLoading, mutateStudents };
}
