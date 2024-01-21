import { faCopy, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { trackFields } from "./Fields";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Field } from "../dataTypes/Field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getDates, getTracks } from "../firebase/database";
import { sampleTrack } from "../dataTypes/Track";
import { Props } from "../views/Dashboard";

let thStyle = "bg-deep-orange dark:bg-light-orange text-white dark:text-deep-orange px-8 py-2";
let tdStyle = "whitespace-nowrap px-8 py-4 text-deep-orange dark:text-light-orange" ;

const Table = (mainProps: {props: Props}) => {
  const [data, setData] = useState([sampleTrack]);
  const [dates, setDates] = useState([{id: "sample", exists: false}]);

	const getTracksFromDb = async () => {
		let tempData = await getTracks();
		setData(tempData);
	}

  const getDatesFromDb = async () => {
		let tempDates = await getDates();
		setDates(tempDates);
	}

	// call function
	useEffect(() => {
		getTracksFromDb();
    getDatesFromDb();
	}, [])

  const showAddEntryView = (event: Event, trackId: string) => {
		event.preventDefault()

		mainProps.props.setCurrentTrack(trackId)
		mainProps.props.changeAddEntryFormDisplay()
	}

  // const showUpdateView = (event: Event, trackId: string) => {
	// 	event.preventDefault()

	// 	mainProps.props.setCurrentTrack(trackId)
	// 	mainProps.props.changeHandler()
	// } 

  const options = [
    // {id: "update", icon: faPenToSquare, text: "Update", onClick: ()=>{}/*showUpdateView*/},
    {id: "addEntry", icon: faCirclePlus, text: "Add Entry", onClick: showAddEntryView},
    // {id: "duplicate", icon: faCopy, text: "Duplicate", onClick: ()=>{}/*showUpdateView*/},
    // {id: "delete", icon: faTrash, text: "Delete", onClick: ()=>{}/*showDeleteView*/},
  ]
  
  const headerCells: Field[] = [
		{id: "options", text: ""},
		...trackFields.map(field => {
				return field
		})
	]

  return (<div className="overflow-x-scroll w-full rounded scroll-smooth">
    <table className="rounded border-solid">
      <tr>
        {headerCells.map(field => {
          return <th className={thStyle}>{field.text}</th>
        })}
        {[...dates].sort((b, a) => a.id.localeCompare(b.id)).map(date => {
          return <th className={thStyle}>{date.id}</th>
        })}
      </tr>
      {[...data].map(track => {
        return (
          <tr className="relative">
            {headerCells.map(headerCell => {
              let cellData: string = "";
              if (headerCell.id == "options") 
                return (
                <td className="inline-block whitespace-nowrap align-middle px-2 py-2">
                  {options.map(option => {
                    return (
                      <button 
                        className="bg-white dark:bg-light-orange dark:text-deep-orange rounded-md px-2 py-1 m-1"
                        onClick={
                          (option.id == "addEntry") 
                          // @ts-ignore
                          ? (event => option.onClick(event, track.id))
                          : (() => option.onClick)
                        }>
                        <FontAwesomeIcon icon={option.icon} />
                      </button>)
                  })}
                </td>
              )
              // @ts-ignore
              cellData = track[headerCell.id];

              if (cellData == "")
                cellData = "-"

              return (<td className={tdStyle}>{cellData}</td>)
            })}
            {[...dates].sort((b, a) => a.id.localeCompare(b.id)).map(date => {
              // @ts-ignore
              return <td className={tdStyle}>{track.data ? track.data[date.id] ? track.data[date.id].toString() : "-" : "-"}</td>
            })}
          </tr>
        )
      })}
    </table>
  </div>)
}

export default Table;