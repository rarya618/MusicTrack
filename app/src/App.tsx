import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './views/Dashboard'
import AddTrackForm from './views/AddTrack';
import AddEntryForm from './views/AddEntry';
import Nav from './components/Nav';

// set page title
export function useTitle(title: string) {
	useEffect(() => {
		const prevTitle = document.title;

		document.title = title + " - MusicTrack";
		
		return () => {
			document.title = prevTitle
		}
	})
}

// close button
const closeButton = (toggle: () => void) => {
  return (<button 
    className="px-2 pt-0 pb-0.5 mt-8 rounded-full bg-red text-white fixed top-0 right-8 text-base"
    onClick={toggle}>
      ×
    </button>)
}

// button
export function Button(text: string, onclick?: () => void) {
  return (
    <button 
      className="px-9 py-2 rounded-md fixed bottom-10 right-10 bg-deep-orange dark:bg-light-orange text-white dark:text-deep-orange"
      onClick={onclick}>{text}</button>
  )
}

function App() {
  const [isAddTrackFormDisplayed, toggleAddTrackFormDisplay] = useState(false)
  const [isAddEntryFormDisplayed, toggleAddEntryFormDisplay] = useState(false)
  const [currentTrack, setCurrentTrack] = useState("")

  const changeAddTrackFormDisplay = () => {
    toggleAddTrackFormDisplay(!isAddTrackFormDisplayed);
  };

  const changeAddEntryFormDisplay = () => {
    toggleAddEntryFormDisplay(!isAddEntryFormDisplayed);
  };

  useTitle("Dashboard")


  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Nav />
      <div className="bg-light-orange dark:bg-deep-orange overflow-x-hidden h-screen">
        {
          isAddTrackFormDisplayed ? (
            <div className="flex flex-col h-screen pb-5 items-center">
              <AddTrackForm changeHandler={changeAddTrackFormDisplay}/>
              {closeButton(changeAddTrackFormDisplay)}
            </div>
          ):
          isAddEntryFormDisplayed ? (
            <div className="flex flex-col h-screen pb-5 items-center">
              <AddEntryForm 
                currentTrack={currentTrack}
                setCurrentTrack={(newTrack: string) => setCurrentTrack(newTrack)} 
                changeHandler={changeAddEntryFormDisplay} />
              {closeButton(changeAddEntryFormDisplay)}
            </div>
          ) :
          <div className="mx-9 h-screen overflow-hidden">
            <Dashboard 
              changeAddTrackFormDisplay={changeAddTrackFormDisplay}
              changeAddEntryFormDisplay={changeAddEntryFormDisplay}
              currentTrack={currentTrack}
              setCurrentTrack={(newTrack: string) => setCurrentTrack(newTrack)} 
              />
          </div>
        }
      </div>
    </div>
  )
}

export default App
