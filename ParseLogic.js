import { useMemo } from "react";

const ParseLogic = (props) => {
  const { logicString, setLogicTree } = props;

  const findPerenthesesGroup = (logicString) => {
    let leftSideIndex = 0;
    let perenthesesDepth = 0;
    let logicBranch = ["logic operator", "logic operand A", "logic operand B"];
    let logicBranchIndex = 1;

    let i = 0;

    for (; i < logicString.length; i++) {
      if (logicString[i] == "(") {
        if (perenthesesDepth == 0) {
          leftSideIndex = i;
        }

        perenthesesDepth += 1;
      } else if (logicString[i] == ")") {
        perenthesesDepth -= 1;

        if (perenthesesDepth == 0) {
          const returnedGroup = findPerenthesesGroup(
            logicString.substring(leftSideIndex + 1, i)
          );

          logicBranch[logicBranchIndex] = returnedGroup;

          logicBranchIndex += 1;

          leftSideIndex = i + 1;
        } else if (perenthesesDepth < 0) {
          console.log("unbalanced perentheses, to many ')'");

          //Report unbalanced perentheses
        }
      }

      if (perenthesesDepth == 0) {
        if (
          logicString[i] == "A" &&
          logicString[i + 1] == "N" &&
          logicString[i + 2] == "D"
        ) {
          if (leftSideIndex < i) {
            const substring = logicString.substring(leftSideIndex, i).trim();

            if (substring.length > 0) {
              logicBranch[logicBranchIndex] = substring;

              logicBranchIndex += 1;
            }

            leftSideIndex = i;
          }

          logicBranch[0] = "AND";

          i += 3;

          leftSideIndex = i;
        } else if (logicString[i] == "O" && logicString[i + 1] == "R") {
          if (leftSideIndex < i) {
            const substring = logicString.substring(leftSideIndex, i).trim();

            if (substring.length > 0) {
              logicBranch[logicBranchIndex] = substring;

              logicBranchIndex += 1;
            }

            leftSideIndex = i;
          }

          logicBranch[0] = "OR";

          i += 2;

          leftSideIndex = i;
        }
      }
    }

    if (leftSideIndex < i) {
      logicBranch[2] = logicString.substring(leftSideIndex, i).trim();

      leftSideIndex = i;
    }

    console.log("returning: ");
    console.log(JSON.stringify(logicBranch));

    return logicBranch;
  };

  const perenthesesGroup = useMemo(() => findPerenthesesGroup(logicString), [
    logicString
  ]);

  setLogicTree(perenthesesGroup);

  return null;
};

export default ParseLogic;
