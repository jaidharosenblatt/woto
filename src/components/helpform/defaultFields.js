export const defaultFields = [
  {
    type: "tags",
    label: "Assignment",
    options: ["hw1", "hw2", "hw3"],
    required: true,
    includeNA: true,
    placeholder: "Select the assignment you are working on",
  },
  {
    type: "select",
    label: "Stage",
    options: [
      "Just started the problem",
      "Understand the problem but no solution",
      "Debugging a solution",
      "Improving/checking a solution",
    ],
    required: true,
    includeNA: true,
    placeholder: "Select what stage of the problem you are in",
  },
  {
    type: "tags",
    label: "Concepts",
    options: ["Linked List", "Array"],
    required: true,
    includeNA: false,
    placeholder: "Select concepts related to your question",
  },
  {
    type: "input",
    label: "Details",
    required: false,
    placeholder: "Add more details to your question",
  },
];
