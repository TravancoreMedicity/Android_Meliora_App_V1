import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../config/Axiox";

// PENDING TICKET COUT
const getPendingrTicketCount = async (empDeptID) => {
  const response = await axiosApi.get(
    `/complaintassign/getDeptPengingTicketCount/${empDeptID}`
  );
  return await response.data;
};

export const UseGetPendingTicketsCount = (empDeptID) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["peningTicketCount"],
    queryFn: () => getPendingrTicketCount(empDeptID),
  });
  return { data, isLoading, isError, isSuccess };
};

//ASSIST REQUEST COUNT AGAINST EMPOYEE
const getPendingAssistRequestCount = async (empID) => {
  const response = await axiosApi.get(
    `/complaintassign/getAssistRequestCount/${empID}`
  );
  return await response.data;
};

export const UseGetPendingTicketCount = (empID) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["getAssistpendingCount"],
    queryFn: () => getPendingAssistRequestCount(empID),
  });
  return { data, isLoading, isError, isSuccess };
};
