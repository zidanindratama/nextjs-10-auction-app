import axiosInstance from "@/helper/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type fetchProps = {
  queryKey: string;
  dataProtected: string;
  multipart?: boolean;
  backUrl?: string;
};

export const useUpdateData = ({
  queryKey,
  dataProtected,
  multipart = false,
  backUrl,
}: fetchProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation: any = useMutation<any>({
    mutationFn: (updateData: any) => {
      if (multipart === false) {
        return axiosInstance.patch(`/protected/${dataProtected}`, updateData);
      }
      return axiosInstance.patch(`/protected/${dataProtected}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onMutate: (variables) => {
      toast(
        <>
          <div className="flex flex-row items-center gap-x-2">
            <Loader className="h-4 w-4" />
            <h1>Changing the data...</h1>
          </div>
        </>
      );
    },
    onError: (error: any, variables, context) => {
      console.log(error);

      toast.error(`${error.response.data.message}`);
    },
    onSuccess: (data, variables, context) => {
      toast.success("Successfully change the data!");

      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (backUrl) {
        router.push(backUrl);
      }
    },
  });

  return mutation;
};
