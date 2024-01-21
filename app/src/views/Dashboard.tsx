import { Button } from "../App"
import Table from "../components/Table"

export type Props = {
  currentTrack: string,
  setCurrentTrack: (newTrack: string) => void
  changeAddTrackFormDisplay: () => void,
  changeAddEntryFormDisplay: () => void,
}

const Dashboard = (props: Props) => {
  return (
    <>
    <div className="flex overflow-hidden h-screen">
      <div className="overflow-scroll">
        <h2 className="text-3xl mb-3 text-deep-orange dark:text-light-orange">Dashboard</h2>
        <Table props={props}  />
        {Button("Add track", props.changeAddTrackFormDisplay)}
      </div>
    </div>
    </>
  )
}

export default Dashboard