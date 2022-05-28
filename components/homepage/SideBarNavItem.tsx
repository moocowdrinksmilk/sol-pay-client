
interface props {
    icon: React.ReactNode
    name: string
}

const SideBarNavItem = (props: props) => {
    return (
        <div className="row gap-4 pl-6 items-center">
            {props.icon}

            <span className="text-lg">
                {props.name}
            </span>
        </div>
    )
}

export default SideBarNavItem