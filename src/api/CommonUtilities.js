import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../config/Axiox";

// GET NOTIFICATION MESSAGES
const getNotificationMessages = async () => {
  const response = await axiosApi.get(
    "notificationMenu/getActiveNotifications"
  );
  return await response.data;
};

export const UsegetNotificationMessages = () => {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["notificationMessages"],
    queryFn: () => getNotificationMessages(),
    // refetchOnMount: false, // refetch data on mount cmp -> false
    // staleTime: 1000 * 60 * 5, // 10 minutes  -> after every 10 minits its refetch when cmp on mount
    // enabled: false, // disable the query running  when cmp on mount
  });
  return { data, isLoading, isError, isSuccess, refetch };
};
