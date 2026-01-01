import { Domain } from "@/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getAllDomains = async (): Promise<Domain[]> => {
  const response = await fetch(`${API_URL}/domains`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch domains, please try again later.');
}

const getDomainById = async (domainId: string): Promise<Domain> => {
  const response = await fetch(`${API_URL}/domains/${domainId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch domain, please try again later.');
}

export default { getAllDomains, getDomainById };
