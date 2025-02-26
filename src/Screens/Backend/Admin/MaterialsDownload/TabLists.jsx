import React from "react";
import ReusableTabs from "../../../../components/Backend/Admin/ReusableTabs";
import MaterialDownloadTypeList from "./TypeList";
import MaterialDownloadList from "./List";

const TabLists = React.memo(() => {
  return (
    <ReusableTabs
      labelArray={["Materials", "Material Types"]}
      componentArray={[
        () => (
          <>
            <MaterialDownloadList />
          </>
        ),
        () => (
          <>
            <MaterialDownloadTypeList />
          </>
        ),
      ]}
    />
  );
});

export default TabLists;
