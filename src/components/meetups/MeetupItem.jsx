import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../ui/Card'
import classes from './MeetupItem.module.css'
import { MeetupsContext } from '../layout/Layout'
import FavIcon from '../ui/FavIcon'
import { useNavigate } from 'react-router-dom'
function MeetupItem(props) {
  const { id, image, title, address, description, favorite } = props.meetup
  const { onFavoritesHandler, onDeleteMeetupHandler } = useContext(MeetupsContext)
  const location = useLocation().pathname
  const navigate = useNavigate()
  const toggleFavoriteStatusHandler = () => {
    onFavoritesHandler(id, favorite)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.imageContainer}>
          <img src={image} alt={title} className={classes.image} />
          <FavIcon isFav={favorite} onClick={toggleFavoriteStatusHandler} className={classes.favIcon} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <svg
            onClick={() => navigate(`/meetup/${id}`)}
            className="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          {location === '/' ? (
            <svg
              onClick={() => onDeleteMeetupHandler(id)}
              height="18px"
              version="1.1"
              viewBox="0 0 14 18"
              width="14px"
              xmlns="http://www.w3.org/2000/svg"
              xmlnssketch="http://www.bohemiancoding.com/sketch/ns"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title />
              <desc />
              <defs />
              <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
                <g fill="#77002e" id="Core" transform="translate(-299.000000, -129.000000)">
                  <g id="delete" transform="translate(299.000000, 129.000000)">
                    <path
                      d="M1,16 C1,17.1 1.9,18 3,18 L11,18 C12.1,18 13,17.1 13,16 L13,4 L1,4 L1,16 L1,16 Z M14,1 L10.5,1 L9.5,0 L4.5,0 L3.5,1 L0,1 L0,3 L14,3 L14,1 L14,1 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </svg>
          ) : null}
        </div>
      </Card>
    </li>
  )
}

export default MeetupItem
