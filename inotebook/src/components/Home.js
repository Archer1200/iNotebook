import Notes from './Notes'
import AddNote from './AddNote'

export default function Home(props) {
    const {showAlert}=props
  return (
    <>
    {/* <AddNote/> */}
    <Notes showAlert={showAlert}/>
    </>
  )
}
 