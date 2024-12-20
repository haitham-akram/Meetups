import { Route, Routes } from 'react-router-dom'
import AllMeetupsPage from './pages/AllMeetups'
import NewMeetupPage from './pages/NewMeetup'
import FavoritesPage from './pages/Favorites'
import EditMeetupPage from './pages/EditMeetup'
import { Layout } from './components/layout/Layout'
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/meetup/:id" element={<EditMeetupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Layout>
  )
}

export default App
