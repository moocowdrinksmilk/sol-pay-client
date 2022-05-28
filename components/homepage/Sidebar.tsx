import Image from 'next/image'
import SideBarNavItem from './SideBarNavItem'
import { FiHome, FiBox, FiClock, FiBarChart} from 'react-icons/fi'


const SideBar = () => {
    return (
        <div className="col w-44 h-screen justify-between">
            <div className="py-4 col gap-10">
                <div className="h-20 relative mb-10">
                    <Image src='/logo.png' layout="fill" objectFit="contain" />
                </div>

                <SideBarNavItem icon={<FiHome size={30} />} name="Home" />
                <SideBarNavItem icon={<FiBox size={30} />} name="Products" />
                <SideBarNavItem  icon={<FiClock size={30} />} name="Balances"/>
                <SideBarNavItem  icon={<FiBarChart size={30} />} name="Analysis"/>
            </div>
        </div>
    )
}

export default SideBar