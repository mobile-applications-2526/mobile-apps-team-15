import { RegisterUserDto, User } from "@/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getUserById = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch user, please try again later.');
}

const registerUser = async ({firstName, lastName, email}: RegisterUserDto): Promise<User> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email
    })
  });
  if (response.ok) return response.json();
  else throw new Error('Failed to register user, please try again later.');
}

const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to login user, please try again later.');
}

const updateUser = async ({id, firstName, lastName, email}: User): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        firstName,
        lastName,
        email
      })
    });
  if (response.ok) return await response.json();
  else throw new Error('Failed to update user, please try again later.');
}

export default { getUserById, registerUser, loginUser, updateUser };
