import FormDeleteAccount from "@/components/users/user-delete/FormDeleteAccount";
import FormUser from "@/components/users/user-detail/FormUser";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mt-8 p-4 sm:px-6 sm:py-0">
      <FormUser idUser={params.id} />
      <FormDeleteAccount idUser={params.id} />
    </div>
  );
};

export default page;
