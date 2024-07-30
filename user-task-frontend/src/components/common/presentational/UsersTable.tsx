import { useState } from "react";
import { useAllUsers } from "../../hooks/api-hooks";
import { useUpdateUser, useDeleteUser } from "../../hooks/api-hooks";
import Button from "../../shared/Button";
import UserModal from "../../shared/UserModal";
import UserActionModal from "../../shared/UserActionModal";
import { toast } from "react-toastify";

const UsersTable = () => {
  const { data: users, isLoading, error } = useAllUsers();
  const { mutate: updateUser, error: iserror } = useUpdateUser();
  const { mutate: deleteUser, error: isErrorDelete } = useDeleteUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalActionOpen, setIsModalActionOpen] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  if (!users) return <div>User not found</div>;

  const handleSubmit = (payload: any) => {
    if (userId) {
      updateUser({
        id: userId,
        data: payload,
      });
    } else {
      console.error("User ID is undefined");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId, {
      onSuccess: () => {
        toast.success("User deleted successfully");
      },
      onError: (err) => {
        toast.error("Error creating user: " + err.message);
      },
    });
  };
  return (
    <div className="relative overflow-x-auto mt-16">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NAME
            </th>
            <th scope="col" className="px-6 py-3">
              EMAIL
            </th>
            <th scope="col" className="flex justify-end px-6 py-3 mr-28">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr
                key={user?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{`${user?.firstName || ""} ${
                  user?.lastName || ""
                }`}</td>
                <td className="px-6 py-4">{user?.email}</td>
                <td className="flex justify-end mt-2">
                  <Button
                    text="Edit"
                    color="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                    height="py-1.5"
                    width="px-4"
                    onClick={() => {
                      setUserId(user?.id);
                      setIsModalOpen(true);
                    }}
                  />
                  <Button
                    text="Delete"
                    color="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                    height="py-1.5"
                    width="px-4"
                    onClick={() => handleDelete(user?.id ?? "")}
                  />
                  <Button
                    text="Run Action"
                    color="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 "
                    height="py-1.5"
                    width="px-4"
                    onClick={() => {
                      setUserId(user?.id);
                      setIsModalActionOpen(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action="edit"
        onSubmit={handleSubmit}
        userId={userId}
      />
      <UserActionModal
        isOpen={isModalActionOpen}
        onClose={() => setIsModalActionOpen(false)}
        onSubmit={handleSubmit}
        action="create"
        userId={userId}
      />
    </div>
  );
};

export default UsersTable;
