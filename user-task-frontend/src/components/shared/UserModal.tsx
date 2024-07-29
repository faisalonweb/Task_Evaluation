import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useUserById } from "../hooks/api-hooks";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  onSubmit: (payload: UserPayload) => void;
  userId?: string;
}

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

const UserModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  action,
  onSubmit,
  userId,
}) => {
  const { data: user, isLoading, error } = useUserById(userId as string);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [actions, setActions] = useState({
    create: false,
    delete: false,
    view: false,
    move: false,
  });

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setActions({
        create: user.actions.create || false,
        delete: user.actions.delete || false,
        view: user.actions.view || false,
        move: user.actions.move || false,
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: UserPayload = {
      firstName,
      lastName,
      email,
      actions,
    };
    onSubmit(payload);
    // Reset form fields after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setActions({ create: false, delete: false, view: false, move: false });
  };

  const handleCheckboxChange = (actionName: keyof typeof actions) => {
    setActions((prev) => ({ ...prev, [actionName]: !prev[actionName] }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {action === "add" ? "Create User" : "Edit User"}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {Object.entries(actions).map(([key, value]) => (
                <div key={key} className="flex items-center mb-4">
                  <input
                    id={`checkbox-${key}`}
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      handleCheckboxChange(key as keyof typeof actions)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-${key}`}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)} item
                  </label>
                </div>
              ))}

              <div className="flex justify-end">
                <Button
                  height="py-2.5"
                  width="px-5"
                  color="text-gray-900 bg-white border border-gray-300 "
                  text="Cancel"
                  textColor="text-gray-900"
                  onClick={onClose}
                  type="button"
                />
                <Button
                  height="py-2.5"
                  width="px-5"
                  color="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 "
                  text={action === "add" ? "Create" : "Edit"}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
