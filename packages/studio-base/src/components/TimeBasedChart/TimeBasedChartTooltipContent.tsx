// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import { mergeStyleSets } from "@fluentui/react";
import { PropsWithChildren } from "react";

import { Time } from "@foxglove/rostime";
import { colors, fonts } from "@foxglove/studio-base/util/sharedStyleConstants";
import { formatTimeRaw } from "@foxglove/studio-base/util/time";

export type TimeBasedChartTooltipData = {
  x: number | bigint;
  y: number | bigint;
  datasetKey?: string;
  path: string;
  value: number | bigint | boolean | string;
  constantName?: string;
  startTime: Time;
  source?: number;
};

type Props = {
  tooltip: TimeBasedChartTooltipData;
};

const classes = mergeStyleSets({
  root: {
    fontFamily: fonts.MONOSPACE,
    fontSize: 11,
    lineHeight: "1.4",
    maxWidth: 350,
    overflowWrap: "break-word",
  },
  table: {
    border: "none",
    width: "100%",
  },
  tableCell: {
    border: "none",
    padding: "0 0.3em",
    lineHeight: "1.3em",
  },
  tableCellHeader: {
    color: colors.DARK2,
    textAlign: "center",

    ":first-child": {
      textAlign: "left",
    },
  },
  tableRow: {
    ":first-child": {
      "th, td": {
        paddingBottom: 4,
        paddingTop: 4,
      },
    },

    ":hover": {
      td: {
        color: colors.DARK4,
        cursor: "pointer",
      },
    },
  },
  title: {
    color: colors.DARK2,
  },
});

export default function TimeBasedChartTooltipContent(
  props: PropsWithChildren<Props>,
): React.ReactElement {
  const { tooltip } = props;
  const value =
    typeof tooltip.value === "string"
      ? tooltip.value
      : typeof tooltip.value === "bigint"
      ? tooltip.value.toString()
      : JSON.stringify(tooltip.value);

  return (
    <div className={classes.root} data-test="TimeBasedChartTooltipContent">
      <div>
        <span className={classes.title}>Value:&nbsp;</span>
        {tooltip.constantName != undefined ? `${tooltip.constantName} (${value})` : value}
      </div>
      <div>
        <span className={classes.title}>Path:&nbsp;</span>
        {tooltip.path}
      </div>
      {tooltip.source != undefined && (
        <div>
          <span className={classes.title}>Source:&nbsp;</span>
          {tooltip.source}
        </div>
      )}
    </div>
  );
}
