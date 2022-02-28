import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import Dashboard from '../../pages/dashboard'
import UserContext from '../../context/user'
import FirebaseContext from '../../context/firebase'
import LoggedInUserContext from '../../context/logged-in-user'
import { getPhotos, getSuggestedProfiles } from '../../services/firebase'
import useUser from '../../hooks/use-user'
import userFixture from '../../fixtures/logged-in-user'
import photosFixture from '../../fixtures/timeline-photos'
import suggestedProfilesFixture from '../../fixtures/suggested-profiles'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ username: 'orwell' }),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

jest.mock('../../services/firebase')
jest.mock('../../hooks/use-user')

describe('<Dashboard />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the dashboard with a user profile and follows a user from the suggested profile', async () => {
    await act(async () => {
      getPhotos.mockImplementation(() => photosFixture)
      getSuggestedProfiles.mockImplementation(() => suggestedProfilesFixture)
      useUser.mockImplementation(() => ({ user: userFixture }))

      const firebaseContextProvider = {
        firestore: jest.fn(() => ({
          collection: jest.fn(() => ({
            doc: jest.fn(() => ({
              update: jest.fn(() => Promise.resolve('User added'))
            }))
          }))
        }))
      }

      const {
        getByText,
        getByAltText,
        getByTitle,
        getAllByText,
        getAllByAltText,
        getByTestId
      } = render(
        <Router>
          <FirebaseContext.Provider
            value={{
              firebaseApp: firebaseContextProvider,
              FieldValue: {
                arrayUnion: jest.fn(),
                arrayRemove: jest.fn()
              }
            }}
          >
            <UserContext.Provider
              value={{
                user: {
                  docId: 'axs8u0J3kPe1OLbrf2tp',
                  userId: 'J4NP9e0tZbUpfDqVAsllx1ClXbR2',
                  username: 'peter',
                  fullName: 'Peter Kwa',
                  emailAddress: 'kwapeter@gmail.com',
                  following: ['2'],
                  followers: ['2', '3', '4'],
                  dateCreated: 1613097964107
                }
              }}
            >
              <Dashboard />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      )
      
      await waitFor(() => {
        expect(document.title).toEqual('Instagram Dashboard')
        expect(getByTitle('Sign Out')).toBeTruthy()
        expect(getAllByText('raphael')).toBeTruthy()
        expect(getAllByAltText('Instagram')).toBeTruthy() 
        expect(getAllByAltText('peter avatar')).toBeTruthy()
        expect(getAllByText('Saint George and the Dragon')).toBeTruthy() 
        expect(getByText('Suggestions for you')).toBeTruthy() 

        fireEvent.click(getByText('Follow'))
        //Really really odd behavior. when the getTestId has the wrong string it causes the suggestions to not render properly
        //Maybe the DOM stops rendering on error
        fireEvent.click(getByTestId('like-photo-nJMT1l8msuNZ8tH3zvVI'))
        fireEvent.keyDown(getByTestId('like-photo-nJMT1l8msuNZ8tH3zvVI'), {
          key: 'Enter'
        })
        fireEvent.click(getByTestId('focus-input-nJMT1l8msuNZ8tH3zvVI'))
        fireEvent.change(getByTestId('add-comment-nJMT1l8msuNZ8tH3zvVI'), {
          target: { value: 'Great photo!' }
        })
        fireEvent.submit(getByTestId('add-comment-submit-nJMT1l8msuNZ8tH3zvVI'))
        fireEvent.change(getByTestId('add-comment-nJMT1l8msuNZ8tH3zvVI'), {
          target: { value: '' }
        })
        fireEvent.keyDown(getByTestId('focus-input-nJMT1l8msuNZ8tH3zvVI'), {
          key: 'Enter'
        })
        fireEvent.submit(getByTestId('add-comment-submit-nJMT1l8msuNZ8tH3zvVI'))
      })


    })
  })
})