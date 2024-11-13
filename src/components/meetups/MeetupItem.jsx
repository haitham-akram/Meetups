import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../ui/Card'
import classes from './MeetupItem.module.css'
import { MeetupsContext } from '../layout/Layout'

function MeetupItem(props) {
  const { id, image, title, address, description, favorite } = props.meetup
  const { onFavoritesHandler, onDeleteMeetupHandler } = useContext(MeetupsContext)
  const location = useLocation().pathname

  const toggleFavoriteStatusHandler = () => {
    onFavoritesHandler(id, favorite)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {favorite ? 'Remove From Favorites' : 'Add To Favorites'}
          </button>
          {location === '/' ? <button onClick={() => onDeleteMeetupHandler(id)}> Delete The Meetup </button> : null}
        </div>
      </Card>
    </li>
  )
}

export default MeetupItem
