import { faChartLine, faTableColumns } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const navItems = [
  {id: "dashboard", text: "Dashboard", icon: faTableColumns},
  {id: "charts", text: "Charts", icon: faChartLine}
]

const Nav = () => {
  return (
    <div className="w-20 z-50 h-screen m-0 pt-3 bg-deep-orange dark:bg-light-orange text-light-orange dark:text-deep-orange t-0 l-0">
      {navItems.map(navItem => {
        return (
        <div className="flex flex-col m-2 w-30">
          <FontAwesomeIcon className="text-4xl" icon={navItem.icon} />
          <span className="mt-1 mb-3 text-center text-xs">{navItem.text}</span>
        </div>
        )
      })}
    </div>
  )
}

export default Nav