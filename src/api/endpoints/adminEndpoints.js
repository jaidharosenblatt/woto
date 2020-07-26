import client from "../axiosConfig";


export const courseData = async (adminId) => {
  //let { data } = await client.get(`/courses/${courseid}` );
  let { data } = await client.get(`/courses/admin/${adminId}` );
  return data;
};

export const getGeneralKey = async (adminId) => {
    //let { data } = await client.get(`/courses/${courseid}` );
    let { data } = await client.get(`/courses/admin/generalKey/${adminId}` );
    return data;
  };




export default { courseData };
