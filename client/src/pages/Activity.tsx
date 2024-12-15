import { useState } from "react";
import TabBar from "../components/main/activity/elements/TabBar";
import ActivityListUser from "../components/main/activity/ActivityListUser";
import ActivityListAll from "../components/main/activity/ActivityListAll";

const Activity = () => {
  const [activeTab, setActiveTab] = useState("myActivities");

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <div className="w-fit">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div>
        {activeTab === "myActivities" && <ActivityListUser />}
        {activeTab === "allActivities" && <ActivityListAll />}
      </div>
    </div>
  );
};

export default Activity;
