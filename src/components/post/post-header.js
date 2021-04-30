import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {  useState, useEffect } from 'react';
import { getUserByUsername } from '../../services/firebase';
import Avataricon from '../icons/avatar-icon';

export default function Header({ content, username }) {

  const [user, setUser] = useState(null)
  

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(content.username);

      if (user) {
        setUser(user[0])
      } else {

        setUser(null)
      }
    }
    checkUserExists();
  }, [content.username, username])

  

  return user ? (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <div className="mr-4">
        <Avataricon user={user} />

        </div>
        <Link to={`/p/${content.username}`} className="flex items-center">          
          <p className="font-bold">{content.username}</p>
        </Link>
      </div>
    </div>
  ) : (null);
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};

// <img
// className="rounded-full h-8 w-8 flex mr-3"
// src={user.avatarSrc}
// alt={`${user.username} profile`}
// />
