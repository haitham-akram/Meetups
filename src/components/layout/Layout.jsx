import classes from './Layout.module.css'
import MainNavigation from './MainNavigation'
import { createContext, useEffect, useState, useCallback } from 'react'

const MeetupsContext = createContext(null)

function Layout(props) {
  const [meetups, setMeetups] = useState([])
  const [favoriteMeetup, setFavoriteMeetup] = useState([])

  const getMeetupsData = async () => {
    const response = await fetch('https://react-736c9-default-rtdb.europe-west1.firebasedatabase.app/meetups.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  }

  const onFavoritesHandler = (id, favorite) => {
    fetch(`https://react-736c9-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ favorite: !favorite }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      updateFavoriteMeetUps()
      getMeetups()
    })
  }

  const updateFavoriteMeetUps = useCallback(async () => {
    const data = await getMeetupsData()
    const loadedMeetups = []
    for (const key in data) {
      if (data[key].favorite) {
        const meetup = {
          ...data[key],
          id: key,
        }
        loadedMeetups.push(meetup)
      }
    }
    setFavoriteMeetup(loadedMeetups)
  }, [])

  const getMeetups = useCallback(async () => {
    const data = await getMeetupsData()
    const loadedMeetups = []
    for (const key in data) {
      const meetup = {
        id: key,
        ...data[key],
      }
      loadedMeetups.push(meetup)
    }
    setMeetups(loadedMeetups)
  }, [])

  const onAddMeetupHandler = (meetupData) => {
    fetch('https://react-736c9-default-rtdb.europe-west1.firebasedatabase.app/meetups.json', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(getMeetups)
  }

  const onDeleteMeetupHandler = async (id) => {
    const response = await fetch(
      `https://react-736c9-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.ok) {
      getMeetups()
    } else {
      console.log("can't be deleted")
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted && meetups.length === 0) {
      getMeetups()
    }
    return () => {
      isMounted = false
    }
  }, [meetups, getMeetups])

  return (
    <MeetupsContext.Provider
      value={{
        meetups,
        getMeetups,
        favoriteMeetup,
        onAddMeetupHandler,
        onFavoritesHandler,
        onDeleteMeetupHandler,
        updateFavoriteMeetUps,
      }}
    >
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </MeetupsContext.Provider>
  )
}

export { Layout, MeetupsContext }
