import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/helper/axiosInstance";

type fetchProps = {
  queryKey: string;
  dataProtected: string;
  backUrl?: string;
};

export const useDeleteData = ({
  queryKey,
  dataProtected,
  backUrl,
}: fetchProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation: any = useMutation<any>({
    mutationFn: (deleteData: any) => {
      return axiosInstance.delete(`/protected/${dataProtected}`, deleteData);
    },
    onMutate: (variables) => {
      toast(
        <>
          <div className="flex flex-row items-center gap-x-2">
            <Loader className="h-4 w-4" />
            <h1>Deleting the data...</h1>
          </div>
        </>
      );
    },
    onError: (error: any, variables, context) => {
      toast.error(`${error.response.data.message}`);
    },
    onSuccess: (data, variables, context) => {
      toast.success("Successfully delete the data!");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (backUrl) {
        router.push(backUrl);
      }
    },
  });

  return mutation;
};
