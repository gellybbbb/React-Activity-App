import React, { useState } from 'react';
import { IUser } from '../interface/User';

interface Props {
  userList: IUser[];
  loggedUser: IUser | null;
  setLoggedUser: (user: IUser | null) => void;
  handlePageChange: (page: string) => void;
}

export default function Login(props: Props) {
    const { userList, loggedUser, setLoggedUser } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const submitBtnUser = () => {
        const user = userList.find((tempUser) => tempUser.username === username);
        if (user) {
            if (user.password === password) {
                localStorage.setItem('loggedUser', JSON.stringify(user));
                setLoggedUser(user);
                props.handlePageChange('dashboard');
            } else {
                alert('Password is incorrect');
            }
        } else {
            alert('User not found');
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Log In</h3>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Username"
                            value={username}
                            onChange={onUsernameChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            onChange={onPassChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="button" className="btn btn-primary" onClick={submitBtnUser}>
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Doesn't have an account?{' '}
                        <button className="deletebtncss" onClick={() => props.handlePageChange('create')}>
                            <a href="#" className="text-decoration-underline text-primary">Create One</a>
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}
