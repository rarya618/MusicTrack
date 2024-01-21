import { FormEvent } from "react";
import { Button, useTitle } from "../App";
import { FormProps, checkboxStyle, formStyle, labelStyle, textboxStyle } from "../components/Form";
import { trackFields } from "../components/Fields";
import { addTrack } from "../firebase/database";

// main form function
function AddTrackForm(props: FormProps) {
  
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
        if (data.name === '') throw("Cannot leave Track Name blank")
        if (data.artist === '') throw("Cannot leave Artist blank")
                  
        await addTrack(data);
  
        // hide form after doc is added
        props.changeHandler();
      } catch (error) {
        // @ts-ignore
        alert(error);
      }
    }
  
    useTitle("Add Track")
  
  
    return (
      <form className={formStyle} onSubmit={formSubmit}>
        <h2 className="mb-4 text-xl">New track</h2>
        {trackFields.map(field => {
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
  
export default AddTrackForm