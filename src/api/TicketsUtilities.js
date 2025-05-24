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
    queryKey: ["getAssistpendingCount", empID],
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

// GET ASSIGNED LIST BASED ON EMPLOYEE ID NUMBER
const getAssignedList = async (empID) => {
  const response = await axiosApi.get(`/complaintassign/user/${empID}`);
  return await response.data;
};

export const UseGetAssignedList = (empID) => {
  console.log(empID);
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["assignedList", empID],
    queryFn: () => getAssignedList(empID),
  });
  return { data, isLoading, isError, isSuccess };
};

// CONST getAssigned ticket Employee list for recfify complaint card
const getAssignListEmp = async (complaint_slno) => {
  const response = await axiosApi.get(
    `Rectifycomplit/getAssignEmps/${complaint_slno}`
  );
  return await response.data;
};

export const UseGetAssignListEmp = (complaint_slno) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["assignedListEmp"],
    queryFn: () => getAssignListEmp(complaint_slno),
  });
  return { data, isLoading, isError, isSuccess };
};

// GET HOLD REASONS

const getHoldReasons = async () => {
  const response = await axiosApi.get(`complaintHoldReason/gethold`);
  return await response.data;
};

export const UseGetHoldReasons = () => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["holdReasons"],
    queryFn: () => getHoldReasons(),
  });
  return { data, isLoading, isError, isSuccess };
};

// EMPLOIYEE LIST WITH OUT LOGGED IN EMPLOYEE
const getEmpWithOutLoginUser = async (postData) => {
  const response = await axiosApi.post(`/complaintassign/assistant`, postData);
  return await response.data;
};

export const UseGetEmpWithOutLoginUser = (postData) => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["empListWithOutLoginUser"],
    queryFn: () => getEmpWithOutLoginUser(postData),
    refetchOnMount: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
  return { data, isLoading, isError, isSuccess };
};

// GET THE THE TICKET ASSITANCE EMPLOYEE LIST WITH STATUS

// EMPLOIYEE LIST WITH OUT LOGGED IN EMPLOYEE
const getAssitedEmpList = async (postCmpNo) => {
  const response = await axiosApi.post(
    `/complaintassign/AssistReqEmployee`,
    postCmpNo
  );
  return await response.data;
};

export const UsegetAssitedEmpList = (postCmpNo) => {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["empAssistData", postCmpNo],
    queryFn: () => getAssitedEmpList(postCmpNo),
    enabled: false,
    // refetchOnMount: true,
    // staleTime: 1000 * 60 * 5, // 10 minutes
  });
  return { data, isLoading, isError, isSuccess, refetch };
};

// ASSIST REQUEST COUNT EMPLOYEE  WISE

const getAssitRequestCount = async (emId) => {
  const response = await axiosApi.get(`/getAssistRequestCount/${emId}`);
  return await response.data;
};

export const UsegetAssitRequestCount = (emId) => {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["assitedRequestCount", emId],
    queryFn: () => getAssitRequestCount(emId),
    // refetchOnMount: false, // refetch data on mount cmp -> false
    // staleTime: 1000 * 60 * 5, // 10 minutes  -> after every 10 minits its refetch when cmp on mount
    // enabled: false, // disable the query running  when cmp on mount
  });
  return { data, isLoading, isError, isSuccess, refetch };
};

// ASSISTREQUEST lIST AGAINST EMPOYEE

const getAssitRequestList = async (emId) => {
  const response = await axiosApi.get(
    `/complaintassign/individual/assist/${emId}`
  );
  return await response.data;
};

export const UsegetAssitRequestList = (emId) => {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["assitedRequestList", emId],
    queryFn: () => getAssitRequestList(emId),
    // refetchOnMount: false, // refetch data on mount cmp -> false
    // staleTime: 1000 * 60 * 5, // 10 minutes  -> after every 10 minits its refetch when cmp on mount
    // enabled: false, // disable the query running  when cmp on mount
  });
  return { data, isLoading, isError, isSuccess, refetch };
};
