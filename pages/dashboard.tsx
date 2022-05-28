import SideBar from "../components/homepage/Sidebar"

const Dashboard = () => {
    return (
        <div className="row bg-gray-50">
            <SideBar />

            <div className="flex-1 col bg-gray-100">
                <div className="row h-20 bg-red-100">

                </div>

                <div className="col w-full px-6 pt-4 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome back Wei Zhen
                        </h1>

                        <h2>
                            Here is your monthly performance
                        </h2>
                    </div>

                    <div className="row rounded-md h-20 bg-white">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard