import NewMeetupForm from '../components/meetups/NewMeetupForm'
import { MeetupsContext } from '../components/layout/Layout'
import { useContext } from 'react'

function NewMeetupPage() {
  const { onAddMeetupHandler } = useContext(MeetupsContext)
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </section>
  )
}
export default NewMeetupPage
