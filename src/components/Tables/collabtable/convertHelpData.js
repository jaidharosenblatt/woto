// Get data for a woto room
export const convertHelpData = (data) => {
  return data.map((item, i) => {
    return {
      key: i,
      _id: item._id,
      assistant: item.assistant,
      name: item.student ? item.student.name : `Student ${i + 1}`,
      createdAt: new Date(item.createdAt),
      description: item.description,

      ...item.description,
    };
  });
};
