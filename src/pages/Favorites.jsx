import { useContext, useEffect } from 'react'
import MeetupList from '../components/meetups/MeetupList'
import { MeetupsContext } from '../components/layout/Layout'

function Favorites() {
  const { updateFavoriteMeetUps, favoriteMeetup } = useContext(MeetupsContext)

  useEffect(() => {
    updateFavoriteMeetUps()
    return () => {
      // Cleanup if necessary
    }
  }, [updateFavoriteMeetUps])

  return (
    <div>
      <h1>My Favorite Meetups</h1>
      {favoriteMeetup.length === 0 ? (
        <h3>No favorite meetups found. Start adding some!</h3>
      ) : (
        <MeetupList meetups={favoriteMeetup} />
      )}
    </div>
  )
}

export default Favorites
