export const defaultFields = [
  {
    type: "select",
    label: "Assignment",
    options: ["hw1", "APT2"],
    required: true,
    includeNA: true,
  },
  {
    type: "select",
    label: "Stage",
    options: ["Just getting Started", "Having a Solution"],
    required: true,
    includeNA: true,
  },
  {
    type: "tags",
    label: "Concepts",
    options: ["Linked List", "Array"],
    required: true,
    includeNA: false,
  },
  {
    type: "input",
    label: "Details",
    required: true,
  },
];
