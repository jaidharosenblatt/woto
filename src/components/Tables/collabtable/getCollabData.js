import API from "../../../api/API";

export const getCollabData = async (course, authContext, requiredFields) => {
  try {
    const response = await API.getWotoData(course._id);
    var formattedData = [];
    console.log(response);
    response.forEach((question, count) => {
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
            id: question._id,
            isYou: isYou,
            lastActive: new Date(question.updatedAt),
            size: question.participants.length,
            participants: question.participants,

            description: question.description,
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
