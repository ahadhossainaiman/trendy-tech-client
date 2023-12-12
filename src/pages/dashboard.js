import DashboardLayouts from "@/components/Layouts/DashboardLayouts";



const dashboard = () => {
    return (
        <div>
            <h1>Aiman</h1>
        </div>
    );
};

export default dashboard;
dashboard.getLayout = function getLayout(page) {
    return <DashboardLayouts>{page}</DashboardLayouts>;
  };