import GMVChart from "../components/homepage/charts/GMVChart"
import SideBar from "../components/homepage/Sidebar"
import { VscTriangleUp } from 'react-icons/vsc'
import { AiOutlineEllipsis } from 'react-icons/ai'
import LineChartItem from "../components/homepage/charts/LineChart"
import ChartContainer from '../components/homepage/charts/ChartContainer'

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
                                <ChartContainer title="Gross Volume" value={-12.2} >
                                    <LineChartItem />
                                </ChartContainer>

                                <ChartContainer title="Net Volume from Sales" value={1.1} >
                                    <LineChartItem />
                                </ChartContainer>
                            </div>

                            <div className="row h-1/3 gap-2">
                                <ChartContainer title="Traffic across platforms" value={12.64} >
                                    <LineChartItem />
                                </ChartContainer>

                                <ChartContainer title="Conversion rate" value={8.33} >
                                    <LineChartItem />
                                </ChartContainer>
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