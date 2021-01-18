export const defaultFields = [
  {
    type: "select",
    label: "Assignment",
    options: [],
    required: true,
    includeNA: true,
    showInTable: true,
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
    showInTable: true,
    placeholder: "Select what stage of the problem you are in",
  },
  {
    type: "input",
    label: "Details",
    required: false,
    placeholder: "Add more details to your question",
  },
];
