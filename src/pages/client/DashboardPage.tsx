import SummaryCards from "../../layouts/components/SummaryCards";
import TaskProgressSection from "../../layouts/components/TaskProgressSection";
import TodoTable from "../../layouts/components/TodoTable";

const DashboardPage = () => {
  return (
    <>
      <SummaryCards />
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mt-10">
        <div className="xl:col-span-3">
          <TodoTable />
        </div>
        <div className="xl:col-span-1">
          <TaskProgressSection />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
