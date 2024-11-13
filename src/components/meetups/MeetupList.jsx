import classes from './MeetupList.module.css'
import MeetupItem from './MeetupItem'
function MeetupList(props) {
  const meetups = props.meetups
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem key={meetup.id} meetup={meetup} />
      ))}
    </ul>
  )
}
export default MeetupList
