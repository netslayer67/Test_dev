import axios from 'axios';

export const getUsers = async () => {
    return await axios.get('https://api.github.com/users');
}

export const searchUsers = async (query) => {
    return await axios.get(`https://api.github.com/search/users?q=${query}`);

}



