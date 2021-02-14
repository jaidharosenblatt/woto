import { Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import DataPieChart from "../../analytics/sessions/DataPieChart";
import LeftRightRow from "../../util-components/leftrightrow/LeftRightRow";

/**
 * Render questionsDistribution data into a pie chart where users
 * can select which field to display pie chart data on
 * @param {Array} questionsDistribution
 * [{fieldName: [{name: String, value: Integer}]}]
 * ex: [{'stage': [{name: 'Just started', value: 4}, {name: 'Debugging', value: 2}]}]
 * @returns {JSX} content to be placed in a card
 */
export default function TopicsPieChart({ questionsDistribution = [] }) {
  const [field, setField] = useState();
  const [chartData, setChartData] = useState();
  const capitalizedText = { textTransform: "capitalize" };

  // set up the first field to be selected on component load
  useEffect(() => {
    if (questionsDistribution?.length !== 0) {
      const newField = questionsDistribution[0];
      const key = Object.keys(newField).pop();
      setField(key);
      trimResponses(newField[key]);
    }
  }, [questionsDistribution]);

  // get a list of strings representing each field name in this course's question form
  const options = questionsDistribution.map((option) =>
    Object.keys(option).pop()
  );

  // callback when user switches field
  const updateField = (fieldIndex) => {
    setField(fieldIndex);
    const newField = questionsDistribution[fieldIndex];
    const key = Object.keys(newField).pop();
    trimResponses(newField[key]);
  };

  /**
   * Trim an array of responses to be the 5 first responses and an option,
   * "other", that has all of the other responses
   * @param {Array} responses
   * Does not return anything. Instead, sets trimmed responses using useState hook
   */
  const trimResponses = (responses) => {
    let otherCount = 0;
    let newOptions = responses.slice(0, 5);
    responses.slice(5, responses.length).forEach((response) => {
      otherCount += response.value;
    });
    newOptions.push({ name: "Other", value: otherCount });
    setChartData(newOptions);
  };

  // If data is not ready, render a skeleton card
  if (!questionsDistribution || questionsDistribution.length === 0) {
    return <Skeleton />;
  }
  return (
    <>
      <LeftRightRow
        left={<h2>Questions</h2>}
        right={
          <Select
            style={{ ...capitalizedText, minWidth: 200 }}
            value={field}
            onChange={updateField}
          >
            {options.map((option, i) => (
              <Select.Option style={capitalizedText} key={i}>
                {option}
              </Select.Option>
            ))}
          </Select>
        }
      />

      <DataPieChart nameKey="fieldName" valueKey="count" data={chartData} />
    </>
  );
}
