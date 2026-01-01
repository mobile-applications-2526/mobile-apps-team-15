import { SkiPass, SkiPassRequestDto } from "@/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getSkiPassById = async (skiPassId: string): Promise<SkiPass> => {
  const response = await fetch(`${API_URL}/skipasses/${skiPassId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch ski pass, please try again later.');
}

const getSkiPassesByUserId = async (userId: string): Promise<SkiPass[]> => {
  const response = await fetch(`${API_URL}/skipasses/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch ski-passes, please try again later.');
}

const getCurrentSkiPassByUserId = async (userId: string): Promise<SkiPass[]> => {
  const response = await fetch(`${API_URL}/skipasses/current/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch current ski-passes, please try again later.');
}

const postSkiPass = async ({ name, userId, skiPassType, endDateTime }: SkiPassRequestDto): Promise<SkiPass> => {
  const response = await fetch(`${API_URL}/skipasses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      userId,
      skiPassType,
      endDateTime
    })
  })
  if (response.ok) return await response.json();
  else throw new Error('Failed to create ski-pass, please try again later.');
}

export default { getSkiPassById, getSkiPassesByUserId, getCurrentSkiPassByUserId, postSkiPass };
