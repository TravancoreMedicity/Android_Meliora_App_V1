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

export const UseGetPendingAssistTicketCount = (empID) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["getAssistpendingCount"],
    queryFn: () => getPendingAssistRequestCount(empID),
  });
  return { data, isLoading, isError, isSuccess };
};

// PENDING TICKET LIST COUNT
const getPendingTicket = async (deptID) => {
  const response = await axiosApi.get(`/complaintassign/${deptID}`);
  return await response.data;
};

export const UseGetPendingTicket = (deptID) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["peningTicketList"],
    queryFn: () => getPendingTicket(deptID),
  });
  return { data, isLoading, isError, isSuccess };
};

// EMPLOYEE ALL SELECTION
const getAllEmployeeList = async (deptPostData) => {
  const response = await axiosApi.post(
    `/complaintassign/getDeptEmployees`,
    deptPostData
  );
  return await response.data;
};

export const UseGetEmployeeList = (deptPostData) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["empList"],
    queryFn: () => getAllEmployeeList(deptPostData),
  });
  return { data, isLoading, isError, isSuccess };
};

// SELECT PRIORITY LIST
const getPriorityList = async () => {
  const response = await axiosApi.get(`/compriority/select`);
  return await response.data;
};

export const UseGetPriorityList = () => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["priorityList"],
    queryFn: () => getPriorityList(),
  });
  return { data, isLoading, isError, isSuccess };
};
