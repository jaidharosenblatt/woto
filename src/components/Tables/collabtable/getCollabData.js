import { compareObjects } from "../../../utilfunctions/getCommonValues";

// Get data for a woto room
export const convertDiscussionsToColumns = (
  discussions,
  authContext,
  requiredFields
) => {
  try {
    var formattedData = [];
    discussions.forEach((question, count) => {
      if (!question.archived) {
        const myId = authContext.state.user._id;
        const isYou = question.owner._id === myId;

        // const inParticipants =
        //   question.participants.filter((item) => item.participant === myId)
        //     .length > 0;

        var name = isYou
          ? `${question.owner.name.split(" ")[0]}'s Room (you)`
          : `${question.owner.name.split(" ")[0]}'s Room`;

        if (question.description.roomName) {
          name = question.description.roomName;
        }
        const participants = question.participants.filter(
          (item) => item.active
        );

        //CHECK FOR OLD DATA, FIELDS COULD BE CHANGED

        var bool = true;
        for (var i = 0; i < requiredFields.length; i++) {
          if (
            Object.keys(question.description).includes(
              requiredFields[i].label.toLowerCase()
            )
          ) {
            continue;
          } else {
            bool = false;
            break;
          }
        }
        if (bool) {
          var temp = {
            key: count,
            name: name,
            owner: question.owner,
            id: question._id,
            isYou: isYou,
            lastActive: new Date(question.updatedAt),
            size: participants.length,
            participants: participants,

            description: question.description,
            discussion: question,
            ...question.description,
          };

          formattedData.push(temp);
        }
      }
    });
    return formattedData;
  } catch (error) {
    console.error(error);
  }
};

// sort discussions by first key then last active
export function sortDiscussionsByDescription(discussions, description) {
  if (!discussions || discussions.length === 0 || !description) {
    return discussions;
  }
  const temp = [...discussions];

  const key = Object.keys(description)[0];

  temp.sort((a, b) => {
    if (
      compareObjects(a.description, description, key) &&
      !compareObjects(b.description, description, key)
    ) {
      return -1;
    }
    if (
      compareObjects(b.description, description, key) &&
      !compareObjects(a.description, description, key)
    ) {
      return 1;
    } else {
      return a.updatedAt - b.updatedAt;
    }
  });

  return temp;
}

export function getCountsForFirstField(firstKey, filterValue, stats) {
  console.log(filterValue, firstKey);
  if (Array.isArray(filterValue)) {
    let sum = 0;
    filterValue.forEach((value) => {
      sum += stats.valueMap[firstKey][value];
    });
    return sum;
  }
  //TODO check for if array
  return stats.valueMap[firstKey][filterValue];
}
