import MeetupForm from '../components/meetups/MeetupForm'
import { MeetupsContext } from '../components/layout/Layout'
import { useContext } from 'react'

function NewMeetupPage() {
  const { onAddMeetupHandler } = useContext(MeetupsContext)
  return (
    <section>
      <h1>Add New Meetup</h1>
      <MeetupForm onAddMeetup={onAddMeetupHandler} onEditMeetup={null} oldMeetup={null} />
    </section>
  )
}
export default NewMeetupPage
