// Get data for a woto room
export const convertHelpData = (data) => {
  console.log(data);
  return data.map((item, i) => {
    return {
      key: i,
      _id: item._id,
      assistant: item.assistant,
      name: `Student ${i + 1}`,
      createdAt: new Date(item.createdAt),
      description: item.description,

      ...item.description,
    };
  });
};
