import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch and display initial set of users
    useEffect(() => {
        axios
            .get("https://api.github.com/users")
            .then(response => {
                const updatedUsers = response.data.map(user => {
                    return {
                        ...user,
                        name: user.name ? user.name : "",
                    };
                });

                setUsers(updatedUsers);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Search function
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        setLoading(true);
        axios
            .get(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(response => {
                setUsers(response.data.items);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user => {
        return (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            || (user.login && user.login.toLowerCase().includes(searchTerm.toLowerCase()))
    });

    console.log(users);
    return (
        <>
            <div className="header">
                <img src={require('../../image/download_.png')} alt="GitHub logo" width="90" height="90" />
                <h1 className="title" style={{ fontFamily: "serif" }}>GITHUB USER LIST</h1>
            </div>
            <div className="user-list">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Find user by name or nickname"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button id="search-button" onClick={handleSearchClick}>
                        Search
                    </button>
                </div>
                {error && <p>{error.message}</p>}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div id="user-list" className="user-container">
                        {filteredUsers.map(user => (
                            <button
                                key={user.id}
                                type="button"
                                className="list-group-item list-group-item-action"
                            >
                                <img src={user.avatar_url} alt={user.login} style={{ height: '64px', width: '64px', borderRadius: '10px' }} />
                                <span>{user.name}</span>
                                <span>({user.login})</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default UserList;


