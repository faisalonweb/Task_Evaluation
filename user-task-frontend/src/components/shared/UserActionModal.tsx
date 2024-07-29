import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useUserById } from "../hooks/api-hooks"; // Assuming this hook is used to fetch user data

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  onSubmit: (payload: any) => void;
  userId?: string;
}

interface Action {
  name: string;
  value: string;
  enabled: boolean;
}

const UserActionModal: React.FC<ModalProps> = ({ isOpen, onClose, userId }) => {
  const [actions, setActions] = useState<Action[]>([]);
  const { data: user, isLoading, error } = useUserById(userId as string);
  useEffect(() => {
    if (isOpen && user) {
      const transformedActions: Action[] = Object.entries(user.actions).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1) + " item", // Capitalize and append "item"
        value: key,
        enabled: Boolean(value),
      }));
      setActions(transformedActions);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Run Actions
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
            <form className="max-w-sm mx-auto">
              <label
                htmlFor="actions"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an Action
              </label>
              <select
                id="actions"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {actions
                  .filter(action => action.enabled)
                  .map(action => (
                    <option key={action.value} value={action.value}>
                      {action.name}
                    </option>
                  ))}
              </select>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActionModal;
