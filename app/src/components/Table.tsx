import { faCopy, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { trackFields } from "./Fields";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Field } from "../dataTypes/Field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getDates, getTracks } from "../firebase/database";
import { sampleTrack } from "../dataTypes/Track";
import { Props } from "../views/Dashboard";
import { Entry } from "../dataTypes/Entry";

let thStyle = "bg-deep-orange dark:bg-light-orange text-white dark:text-deep-orange px-8 py-2";
let tdStyle = "whitespace-nowrap px-8 py-4 text-deep-orange dark:text-light-orange" ;

// returns the last count from the data
const lastCount = (data: {} | undefined) => {
  if (data) {
    const values = Object.values(data);

    // @ts-ignore
    let tempData: number[] = [...values].sort((b, a) => a - b)

    return (tempData.length != 0) ? tempData[0] : 0
  }

  return 0
}

const getMonth = (month: string) => {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return months[parseInt(month) - 1]
}

const formatDate = (dateString: string) => {
  let dateArray = dateString.split("-")

  return dateArray[2] + " " + getMonth(dateArray[1])
}

// element formatting
const ThElement = (text: string) => {
  return <th className={thStyle}>{text}</th>
}

const TdElement = (text: string) => {
  return <td className={tdStyle}>{text}</td>
}

// Table component
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

  return (<div className="w-full rounded scroll-smooth">
    <table className="rounded border-solid">
      <tr>
        {headerCells.map(field => {
          return ThElement(field.text)
        })}
        <th className={thStyle}>Last count</th>
        {[...dates].sort((b, a) => a.id.localeCompare(b.id)).map(date => {
          return ThElement(formatDate(date.id))
        })}
      </tr>
      {[...data].sort((a, b) => lastCount(b.data) - lastCount(a.data)).map(track => {
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
                        className="bg-deep-orange text-light-orange dark:bg-light-orange dark:text-deep-orange rounded-md px-2 py-1 m-1"
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

              return TdElement(cellData)
            })}
            {TdElement(lastCount(track.data).toString())}
            {[...dates].sort((b, a) => a.id.localeCompare(b.id)).map(date => {
              // @ts-ignore
              return TdElement(track.data ? track.data[date.id] ? track.data[date.id].toString() : "-" : "-")
            })}
          </tr>
        )
      })}
    </table>
  </div>)
}

export default Table;