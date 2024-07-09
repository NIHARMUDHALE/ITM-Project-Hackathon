import axios from "axios";
//import { queryClient } from "../lib/queryClient";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

export const useCreateUserWithRole = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["newUser"],
    mutationFn: async ({ role, token }) => {
      const url = `${BACKEND_URI}/api/user/role`;
      const data = {
        role: role,
        token: token,
      };

      console.log(await getToken());
      return axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useGetAllUsers = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["users", { type: "active" }],
    queryFn: async () => {
      try {
        let url = `${BACKEND_URI}/api/user/all-users`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        });

        return res.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useDeleteUser = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["user", { action: "delete" }],
    mutationFn: async (id) => {
      const url = `${BACKEND_URI}/api/user/delete-user`;

      return await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
