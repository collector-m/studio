// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { IconButton } from "@fluentui/react";

import { AppSetting } from "@foxglove/studio-base/AppSetting";
import { SidebarContent } from "@foxglove/studio-base/components/SidebarContent";
import { useAppConfigurationValue } from "@foxglove/studio-base/hooks/useAppConfigurationValue";

import DataSourceSidebarContent from "./DataSourceSidebarContent";
import helpContent from "./help.md";

type Props = {
  onSelectDataSourceAction: () => void;
};

export default function DataSourceSidebar(props: Props): JSX.Element {
  const { onSelectDataSourceAction } = props;
  const [enableOpenDialog] = useAppConfigurationValue(AppSetting.OPEN_DIALOG);

  return (
    <SidebarContent
      title="Data source"
      helpContent={helpContent}
      trailingItems={[
        enableOpenDialog === true && (
          <IconButton
            key="add-connection"
            iconProps={{ iconName: "Add" }}
            styles={{
              icon: {
                svg: { height: "1em", width: "1em" },
                "> span": { display: "flex" },
              },
            }}
            onClick={onSelectDataSourceAction}
          />
        ),
      ].filter(Boolean)}
    >
      <DataSourceSidebarContent />
    </SidebarContent>
  );
}
