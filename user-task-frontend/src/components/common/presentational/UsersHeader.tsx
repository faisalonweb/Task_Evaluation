import React, { useState } from "react";
import Button from "../../shared/Button";
import UserModal from "../../shared/UserModal";
import { useCreateUser } from "../../hooks/api-hooks";
import { toast } from "react-toastify";

interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  actions: {
    create: boolean;
    delete: boolean;
    view: boolean;
    move: boolean;
  };
}
const UsersHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, error } = useCreateUser({
    onSuccess: () => {
      toast.success("User created successfully!");
    },
    onError: (error) => {
      toast.error("Error creating user: " + error.message);
    },
  });

  const handleSubmit = (payload: UserPayload) => {
    mutate(payload);
    setIsModalOpen(false);
  };
  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-[30px] ml-5">Users</h1>
      <Button onClick={() => setIsModalOpen(true)} text="Create" />
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action="add"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UsersHeader;
