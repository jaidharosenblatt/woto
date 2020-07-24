export const defaultFields = [
  {
    type: "select",
    label: "Assignment",
    options: ["hw1", "hw2", "hw3"],
    required: true,
    includeNA: true,
    placeholder: "Select the assignment you are working on",
  },
  {
    type: "select",
    label: "Stage",
    options: ["Just getting Started", "Having a Solution"],
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
