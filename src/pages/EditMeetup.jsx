import MeetupForm from '../components/meetups/MeetupForm'
import { MeetupsContext } from '../components/layout/Layout'
import { useContext } from 'react'

function EditMeetupPage() {
  const { onEditMeetupHandler, getOneMeetup } = useContext(MeetupsContext)
  return (
    <section>
      <h1>Edit Meetup</h1>
      <MeetupForm onAddMeetUp={null} onEditMeetup={onEditMeetupHandler} getOneMeetup={getOneMeetup} />
    </section>
  )
}
export default EditMeetupPage
