// Get data for a woto room
export const convertHelpData = (data) => {
  return data.map((item, i) => {
    return {
      key: i,
      name: `Student ${i + 1}`,
      createdAt: new Date(item.createdAt),
      ...item.description,
    };
  });
};
