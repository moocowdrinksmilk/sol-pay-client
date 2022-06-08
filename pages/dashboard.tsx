import GMVChart from "../components/homepage/charts/GMVChart"
import SideBar from "../components/homepage/Sidebar"
import { VscTriangleUp } from 'react-icons/vsc'
import { AiOutlineEllipsis } from 'react-icons/ai'
import LineChartItem from "../components/homepage/charts/LineChart"

const Dashboard = () => {
    return (
        <div className="row bg-gray-50">
            <SideBar />

            <div className="flex-1 col bg-gray-100">
                <div className="row h-20 bg-red-100">

                </div>

                <div className="col w-full px-6 pt-4 gap-4 h-full">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome back Wei Zhen
                        </h1>

                        <h2>
                            Here is your monthly performance
                        </h2>
                    </div>

                    <div className="row h-full">
                        <div className="col w-9/12 pb-10 gap-2">

                            <div className="col rounded-md h-1/3 bg-white relative z-10 relative">
                                <div className="absolute top-0 left-0 p-4">
                                    <h1>
                                        GMV
                                    </h1>

                                    <div className="row items-center">
                                        <VscTriangleUp fill="green" />
                                        <span>
                                            12.2%
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 p-4">
                                    <AiOutlineEllipsis />
                                </div>
                                <div className="h-full rounded-md">
                                    <GMVChart />
                                </div>
                            </div>

                            <div className="row h-1/3 gap-2">
                                <div className="w-1/2 h-full rounded-md bg-white">
                                <LineChartItem />
                                </div>

                                <div className="w-1/2 h-full rounded-md bg-white">
                                <LineChartItem />
                                </div>
                            </div>

                            <div className="row h-1/3 gap-2">
                                <div className="flex-1 rounded-md bg-white">
                                    <LineChartItem />
                                </div>

                                <div className="flex-1 rounded-md bg-white">
                                    <LineChartItem />
                                </div>
                            </div>



                        </div>

                        <div className="">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard