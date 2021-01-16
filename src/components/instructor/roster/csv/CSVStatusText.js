import React from "react";

export default function CSVStatusText() {
  return (
    <p>
      Upload a .csv file that includes the Duke NetId and name of the users you
      want to enroll.{" "}
      <a
        href="https://res.cloudinary.com/dwgqvt5ng/raw/upload/v1610429507/example_roster_oljbhv.csv"
        download="example_roster.csv"
      >
        Click here
      </a>{" "}
      for an example roster .csv file
    </p>
  );
}
