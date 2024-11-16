import { useEffect, useRef, useState } from 'react'
import classes from './NewMeetupForm.module.css'
import Card from '../ui/Card'
import { useLocation, useParams } from 'react-router-dom'
function MeetupForm(props) {
  const titleInputRef = useRef()
  const imageInputRef = useRef()
  const addressInputRef = useRef()
  const descriptionInputRef = useRef()
  const { onAddMeetup, onEditMeetup, getOneMeetup } = props
  const { id } = useParams()
  const location = useLocation().pathname
  const [oldMeetup, setOldMeetup] = useState(null)

  useEffect(() => {
    if (location !== '/new-meetup' && getOneMeetup) {
      getOneMeetup(id).then((data) => {
        setOldMeetup(data)
        titleInputRef.current.value = data.title
        imageInputRef.current.value = data.image
        addressInputRef.current.value = data.address
        descriptionInputRef.current.value = data.description
      })
    }
  }, [id, location, getOneMeetup])

  const submitHandler = (event) => {
    event.preventDefault()

    const meetupData = {
      title: titleInputRef.current.value,
      image: imageInputRef.current.value,
      address: addressInputRef.current.value,
      description: descriptionInputRef.current.value,
      favorite: oldMeetup ? oldMeetup.favorite : false,
    }

    location === '/new-meetup' ? onAddMeetup(meetupData) : onEditMeetup(id, meetupData)
    titleInputRef.current.value = ''
    imageInputRef.current.value = ''
    addressInputRef.current.value = ''
    descriptionInputRef.current.value = ''
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows="5" required ref={descriptionInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button> Submit </button>
        </div>
      </form>
    </Card>
  )
}

export default MeetupForm
