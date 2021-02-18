import flaskClient from "../flaskAxiosConfig";

export const loadDashboardHome = async (
  courseId,
  startDate,
  endDate,
  assistant
) => {
  let { data } = await flaskClient.get(`/${courseId}/ataglance`, {
    params: {
      startDate,
      endDate,
      assistant,
    },
  });

  return data;
};
