import { useQuery, QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { UserPayload } from "../../helpers/users-interface";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type FetchFunction<T> = () => Promise<T>;

export function useApiQuery<T>(
  queryKey: QueryKey,
  fetchFunction: FetchFunction<T>,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey,
    queryFn: fetchFunction,
    refetchInterval: 1000,
    ...options,
  });
}

const API_BASE_URL = "http://localhost:8000";

export const fetchAllUsers = async (): Promise<UserPayload[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchUserById = async (id: string): Promise<UserPayload> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useAllUsers = () =>
  useApiQuery<UserPayload[]>(["users"], fetchAllUsers);
export const useUserById = (id: string) =>
  useApiQuery<UserPayload>(["user", id], () => fetchUserById(id));

export const createUser = async (
  userData: UserPayload
): Promise<UserPayload> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useCreateUser = (
  options?: Omit<
    UseMutationOptions<UserPayload, Error, UserPayload>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: createUser,
    ...options,
  });
};

export const updateUser = async (
  id: string,
  userData: Partial<UserPayload>
): Promise<UserPayload> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT", // or "PATCH" if partial update
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useUpdateUser = (
  options?: Omit<
    UseMutationOptions<
      UserPayload,
      Error,
      { id: string; data: Partial<UserPayload> }
    >,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    ...options,
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const useDeleteUser = (
  options?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">
) => {
  return useMutation({
    mutationFn: deleteUser,
    ...options,
  });
};
