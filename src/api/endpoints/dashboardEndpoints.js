import flaskClient from "../flaskAxiosConfig";

export const loadDashboardHome = async (
  courseId,
  startDate,
  endDate,
  assistant
) => {
  let res = await flaskClient.get("/ataglance", {
    params: {
      course_id: courseId,
      t_start: startDate,
      t_end: endDate,
      assistant,
    },
  });

  return res?.data?.data;
};
