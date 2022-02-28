import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../../pages/not-found';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const firebaseApp = {
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({
        user: { updateProfile: jest.fn(() => Promise.resolve('I am signed up!'))}
      })
    )
  }))
}

describe('<Login />', () => {
  it('renders the login page with a form submission and logs the user in', async () => {
    const { getByText } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebaseApp }}>
          <UserContext.Provider value={{ user: {} }}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
      )

      expect(getByText('Page Not Found!')).toBeTruthy();
      expect(document.title).toEqual('Not Found - Instagram');
  })

  it('renders the not found page with no active logged in user', async () => {
    const { getByText } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebaseApp }}>
          <UserContext.Provider value={{ user: null }}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
      )

      expect(getByText('Page Not Found!')).toBeTruthy();
      expect(document.title).toEqual('Not Found - Instagram');
  })
})
    