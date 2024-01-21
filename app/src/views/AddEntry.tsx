import { FormEvent, useEffect, useState } from "react";
import { Button, useTitle } from "../App";
import { addEntry, getTrack } from "../firebase/database";
import { checkboxStyle, formStyle, labelStyle, textboxStyle } from "../components/Form";
import { trackFields } from "../components/Fields";
import { sampleTrack } from "../dataTypes/Track";
import { Field } from "../dataTypes/Field";

type Props = {
  currentTrack: string,
  setCurrentTrack: (newTrack: string) => void,
  changeHandler: () => void
}

function AddEntryForm(props: Props) {
  const [trackData, setTrackData] = useState(sampleTrack)

  const getTrackFromDb = async () => {
		let tempData = await getTrack(props.currentTrack);
    // @ts-ignore
		setTrackData(tempData);
	}

	// call function
	useEffect(() => {
		getTrackFromDb();
	}, [])

  const entryFields: Field[] = [
    {id: "date", text: "Date", dataType: "date"},
    {id: "count", text: "Count", dataType: "number"},
  ]

  // form submit operation
  const formSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // @ts-ignore
    const elementsArray = [...event.target.elements];

    const data = elementsArray.reduce((acc, element) => {
      if (element.id) {
        if (element.type == "checkbox") {
          acc[element.id] = element.checked;
        } else {
          acc[element.id] = element.value;
        }
      }

      return acc;
    }, {});

    try {
      // check for required data
      if (data.date === '') throw("Cannot leave date blank")
      if (data.count === '') throw("Cannot leave count blank")
                
      await addEntry(props.currentTrack, {date: data.date, count: parseInt(data.count)});

      // hide form after doc is added
      props.changeHandler();

    } catch (error) {
      // @ts-ignore
      alert(error);
    }
  }
  
  useTitle("New Entry")

  return (
    <form className={formStyle} onSubmit={formSubmit}>
      <h2 className="mb-4 text-xl">New entry</h2>
      {trackFields.map(field => {
      return (
          <div className="my-4 flex w-full">
            <p className={labelStyle}>{field.text}</p>
            {/* @ts-ignore */}
            <p className={labelStyle}>{trackData[field.id]}</p>
          </div>
        )
      })}
      {entryFields.map(field => {
      return (
          <div className="my-4 flex w-full">
            <p className={labelStyle}>{field.text}</p>
            {field.dataType == "checkbox" ? 
                <input 
                  className={checkboxStyle}
                  id={field.id}
                  type={field.dataType}
                /> : 
                <input 
                  className={textboxStyle}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.dataType}
                />}
          </div>
        )
      })}
      {Button("Submit")}
    </form>
  )
}

export default AddEntryForm