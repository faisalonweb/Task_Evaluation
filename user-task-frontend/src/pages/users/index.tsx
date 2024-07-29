import React from "react";
import UsersHeader from "../../components/common/presentational/UsersHeader";
import UsersTable from "../../components/common/presentational/UsersTable";

const Users = () => {
  return (
    <div className="p-20 min-h-screen">
      <UsersHeader />
      <UsersTable />
    </div>
  );
};

export default Users;
