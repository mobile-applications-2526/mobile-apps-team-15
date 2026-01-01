import { Slope, SlopeDifficulty } from "@/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getAllSlopes = async (): Promise<Slope[]> => {
  const response = await fetch(`${API_URL}/slopes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error("Failed to fetch slopes, please try again later.");
}

const getSlopeById = async (slopeId: string): Promise<Slope> => {
  const response = await fetch(`${API_URL}/slopes/${slopeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error("Failed to fetch slope, please try again later.");
}

const getSlopesByDomainId = async (domainId: string): Promise<Slope[]> => {
  const response = await fetch(`${API_URL}/slopes/domain/${domainId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error("Failed to fetch slopes, please try again later.");
}

const getSlopesByDifficulty = async (difficulty: SlopeDifficulty): Promise<Slope[]> => {
  const response = await fetch(`${API_URL}/slopes/difficulty/${difficulty}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error("Failed to fetch slopes, please try again later.");
}

export default { getAllSlopes, getSlopeById, getSlopesByDomainId, getSlopesByDifficulty }
