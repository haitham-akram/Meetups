import classes from './Layout.module.css'
import MainNavigation from './MainNavigation'
import { createContext, useEffect, useState, useCallback } from 'react'
import Alert from '../ui/Alert'
import NewMeetupForm from '../meetups/MeetupForm'

const MeetupsContext = createContext(null)

function Layout(props) {
  const [meetups, setMeetups] = useState([])
  const [favoriteMeetup, setFavoriteMeetup] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

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
      setAlertMessage(
        favorite ? 'Meetup is Added to Favorites Successfully!' : 'Meetup is removed from Favorites Successfully!'
      )
      setShowAlert(true)
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
    })
      .then(getMeetups)
      .then(() => {
        setAlertMessage('Meetup added successfully!')
        setShowAlert(true)
      })
  }
  const getOneMeetup = async (id) => {
    const response = await fetch(
      `https://react-736c9-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    return data
  }
  const onEditMeetupHandler = async (id, editedMeetupData) => {
    const response = await fetch(
      `https://react-736c9-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMeetupData),
      }
    )
    console.log(response.body)
    setAlertMessage('Meetup edited successfully!')
    setShowAlert(true)
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
      setAlertMessage('Meetup deleted successfully!')
      setShowAlert(true)
    } else {
      console.log("can't be deleted")
    }
  }

  const closeAlertHandler = () => {
    setShowAlert(false)
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
        onEditMeetupHandler,
        getOneMeetup,
      }}
    >
      <MainNavigation />
      {showAlert && <Alert message={alertMessage} onClose={closeAlertHandler} />}
      <main className={classes.main}>{props.children}</main>
    </MeetupsContext.Provider>
  )
}

export { Layout, MeetupsContext }
