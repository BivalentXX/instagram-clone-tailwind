import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SignUp from '../../pages/signup';
import FirebaseContext from '../../context/firebase';
import { doesUsernameExist } from '../../services/firebase';
import * as ROUTES from '../../constants/routes';

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

jest.mock('../../services/firebase')

describe('<SignUp />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the sign up page with a form submission and signs a user up', async () => {
    const firebaseApp = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          add: jest.fn(() => Promise.resolve('User added'))
        }))
      })),
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: { 
            updateProfile: jest.fn(() => Promise.resolve('I am signed up!'))
          }
        }))
      }))
    }
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebaseApp }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    )
    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve(true))
      await fireEvent.change(getByPlaceholderText('Username'), { 
        target: { value: 'test' }
      })
      await fireEvent.change(getByPlaceholderText('Full name'), {
        target: { value: 'Test User' }
      })
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'test@gmail.com' }
      })
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'testpass' }
      })
      fireEvent.submit(getByTestId('signup'));

      expect(document.title).toEqual('Sign Up - Instagram');
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith('test');

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD)
        expect(getByPlaceholderText('Username').value).toBe('test')
        expect(getByPlaceholderText('Full name').value).toBe('Test User')
        expect(getByPlaceholderText('Email address').value).toBe('test@gmail.com')
        expect(getByPlaceholderText('Password').value).toBe('testpass')
        expect(queryByTestId('error')).toBeFalsy();
      })
    })
  })

  it('renders the sign up page but an error is thrown', async () => {
    const firebaseApp = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: { 
            updateProfile: jest.fn(() => Promise.reject(new Error('Username exists')))
          }
        }))
      }))
    }
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebaseApp }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    )
    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve(false))
      await fireEvent.change(getByPlaceholderText('Username'), { 
        target: { value: 'peter' }
      })
      await fireEvent.change(getByPlaceholderText('Full name'), {
        target: { value: 'Test User' }
      })
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'kwapeter@gmail.com' }
      })
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'testpass' }
      })
      fireEvent.submit(getByTestId('signup'));

      expect(document.title).toEqual('Sign Up - Instagram');
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith('peter');

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD)
        expect(getByPlaceholderText('Username').value).toBe('')
        expect(getByPlaceholderText('Full name').value).toBe('')
        expect(getByPlaceholderText('Email address').value).toBe('')
        expect(getByPlaceholderText('Password').value).toBe('')
        expect(queryByTestId('error')).toBeTruthy();
      })
    })
  })
})