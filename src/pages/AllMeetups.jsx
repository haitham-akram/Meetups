import { useContext, useEffect } from 'react'
import MeetupList from '../components/meetups/MeetupList'
import { MeetupsContext } from '../components/layout/Layout'

function AllMeetupsPage() {
  const { meetups, getMeetups } = useContext(MeetupsContext)

  useEffect(() => {
    getMeetups()
  }, [getMeetups])

  return (
    <section>
      <h1>All Meetups</h1>
      {meetups.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="../src/assets/loading.webp" style={{ width: 100, height: 100 }} />
        </div>
      ) : (
        <MeetupList meetups={meetups} />
      )}
    </section>
  )
}

export default AllMeetupsPage
