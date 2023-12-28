import DashboardLayouts from "@/components/Layouts/DashboardLayouts";


const profile = () => {
    return (
        <div>
            <h1>Aiman</h1>
        </div>
    );
};

export default profile;
profile.getLayout = function getLayout(page) {
    return <DashboardLayouts>{page}</DashboardLayouts>;
  };