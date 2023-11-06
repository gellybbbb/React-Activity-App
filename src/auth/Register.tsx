import React, { useState } from 'react';
import { IUser } from '../interface/User';

interface Props {
  userList: IUser[];
  setUserList: (userList: IUser[]) => void;
  handlePageChange: (page: string) => void;
}

export default function Register(props: Props) {
    const { userList, setUserList } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const submitBtnUser = () => {
        const data = {
            id: new Date().toJSON().toString(),
            username: username,
            password: password,
        };

        const isUser = userList.find((tempUser) => tempUser.username === username);

        if (!isUser) {
            const tempList = localStorage.getItem('userList');
            const temp = tempList ? JSON.parse(tempList) : [];
            localStorage.setItem('userList', JSON.stringify([...temp, data]));
            setUserList([...temp, data]);
            alert('User successfully created');
            props.handlePageChange('dashboard');
        } else {
            alert('Username already exists');
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Create Account</h3>
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
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
