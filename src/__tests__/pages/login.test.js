import React from 'react'
import { render, fireEvent, waitFor} from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import Login from '../../pages/login'
import FirebaseContext from '../../context/firebase'
import * as ROUTES from '../../constants/routes'

jest.mock('../../services/firebase')

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

describe('<Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the login page with a form submission and logs the user in', async () => {
    const succeededToLogin = jest.fn(() => Promise.resolve('I am signed in!'))
    const firebaseApp = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeededToLogin
      }))
    }
    
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
    <Router>
      <FirebaseContext.Provider value={{ firebaseApp }}>
        <Login />
      </FirebaseContext.Provider>
    </Router>
    )
    await act(async () => {   
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'kwapeter@gmail.com' }
      })
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'Test123' }
      })
      fireEvent.submit(getByTestId('login'))

      expect(document.title).toEqual('Login - Instagram')
      //a typo in package.json>jest>collectcoveragewfrom>services.firebase caused this test to fail
     

      await waitFor(() => {
        expect(succeededToLogin).toHaveBeenCalled()
        expect(succeededToLogin).toHaveBeenCalledWith('kwapeter@gmail.com', 'Test123')
        //Debugging solution: error in console ended up listing in plain text on the descirbe "Cannot read properties of undefined (reading 'auth')". I had used the wrong variable name
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD)
        expect(getByPlaceholderText('Email address').value).toBe('kwapeter@gmail.com')
        expect(getByPlaceholderText('Password').value).toBe('Test123')
        expect(queryByTestId('error')).toBeFalsy()
      }) 
    })      
  })

  it('renders the login in page with a form submission and fails to log a user in', async () => {
    const failToLogin = jest.fn(() => Promise.reject(new Error('Cannot sign in')))
    const firebaseApp = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin
      }))
    }
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebaseApp }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    )
    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'failToLogin@gmail.com' }
      })
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'Test123' } 
      })
      fireEvent.submit(getByTestId('login'))

      expect(document.title).toEqual('Login - Instagram')
      expect(failToLogin).toHaveBeenCalled()
      expect(failToLogin).toHaveBeenCalledWith('failToLogin@gmail.com', 'Test123')
      expect(failToLogin).rejects.toThrow('Cannot sign in')

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD)
        expect(getByPlaceholderText('Email address').value).toBe('')
        expect(getByPlaceholderText('Password').value).toBe('')
        expect(queryByTestId('error')).toBeTruthy()
      })
    })
  })

})