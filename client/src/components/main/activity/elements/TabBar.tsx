interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabBar = ({ activeTab, setActiveTab }: TabBarProps) => {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      <a
        role="tab"
        className={`tab ${activeTab === "myActivities" ? "tab-active" : ""}`}
        onClick={() => setActiveTab("myActivities")}
      >
        My Activities
      </a>
      <a
        role="tab"
        className={`tab ${activeTab === "allActivities" ? "tab-active" : ""}`}
        onClick={() => setActiveTab("allActivities")}
      >
        All Activities
      </a>
    </div>
  );
};

export default TabBar;
