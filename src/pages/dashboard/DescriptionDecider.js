const DescriptionDecider = (page) => {
  switch (page) {
    case "At a Glance":
      return "View course statistic over a period of time or of specific teaching assistants";
    case "Schedule Helper":
      return "Utilize key metrics broken down by day of the week and time of day to more efficiently schedule officer hours";
    case "Specific Session":
      return "Select a session below to view specific statistics relevant to that date";
    case "Roster":
      return "View, add, or remove teaching assistants and students in your course";
    case "Course Settings":
      return "Configure your course policies, permissions, and defaults";
    case "default":
      return "View course statistic over a period of time or of specific teaching assistants";
  }
};

export default DescriptionDecider;
