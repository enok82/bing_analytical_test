import React, { useEffect, useState, useRef, Fragment } from "react";
import { Grid, GridItem, Button } from "@patternfly/react-core";
// import { ChartDonut } from '@patternfly/react-charts';

import BasaltTable from "./BasaltTable";
import BasaltToolbar from "./BasaltToolbar";
import FilterIssues from "./FilterIssues";

export default function Projects(props) {
  // const [intervallId, setIntervalId] = useState(() => {
  //     return 'null';
  // });

  // const [backendState, setBackendState] = useState(() => {
  //     return 'Update Backend Issues';
  // });

  const [getIssuesString, setGetIssuesString] = useState(() => {
    return "Get Issues";
  });

  const [issues, setIssues] = useState(() => {
    return [];
  });

  const [filteredIssues, setFilteredIssues] = useState(() => {
    return [];
  });

  // const [processProgress, setProcessProgress] = useState(() => {
  //     return 0;
  // });

  // const [donutData, setDonutData] = useState(() => {
  //     return [];
  // });

  const [columnSelection, setColumnSelection] = useState(() => {
    return [];
  });

  // useEffect(() => {
  //     console.log(filteredIssues);
  // }, [filteredIssues]);

  // function RequestIssues() {
  //     fetch('api/update-issues')
  //         .then((response) => response.json()
  //             .then((data) => {
  //                 setIntervalId(setInterval(GetBackendState, 1000));

  //                 setBackendState(data.state);
  //             })
  //         );
  // };

  function GetIssues() {
    fetch("api/get-issues").then((response) =>
      response.json().then((data) => {
        setIssues(data);

        setGetIssuesString("Issues Got!");
      })
    );
  }

  // function GetBackendState() {
  //     fetch('api/get-backend-state')
  //         .then((response) => response.json())
  //         .then((data) => {
  //             setProcessProgress(data.progress);

  //             if (data.progress >= 100) {
  //                 clearInterval(intervallId);
  //                 setIntervalId('null');

  //                 setBackendState("Issue DB updated");
  //             } else {
  //                 setBackendState(data.state);
  //             }
  //         }
  //         );
  // };

  // useEffect(() => {
  //     setDonutData([processProgress, 100 - processProgress]);
  // }, [processProgress]);

  // useEffect(() => {
  //     return () => clearInterval(intervallId);
  // }, [intervallId]);

  return (
    <Fragment>
      <h3>Issues</h3>
      <Grid lg={8}>
        {/* <GridItem span={1}>
                    <ChartDonut
                        ariaDesc="Progress"
                        ariaTitle="Progress"
                        constrainToVisibleArea={true}
                        data={donutData}
                        width={100}
                        height={50}
                    />
                </GridItem> */}
        {/* <GridItem span={3}>
                    <Button
                        id="Update Issues"
                        onClick={RequestIssues}>
                        <p>{backendState}</p>
                    </Button>
                </GridItem> */}
        <GridItem span={3}>
          <Button id="Get Issues" onClick={GetIssues}>
            <p>{getIssuesString}</p>
          </Button>
        </GridItem>
      </Grid>
      <BasaltToolbar issues={issues} setColumnSelection={setColumnSelection} />
      <FilterIssues issues={issues} setFilteredIssues={setFilteredIssues} />
      <BasaltTable issues={filteredIssues} columnSelection={columnSelection} />
    </Fragment>
  );
}
