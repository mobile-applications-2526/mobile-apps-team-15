import { Lift, LiftStatus } from "@/types";
import { auth } from "@/services/FirebaseConfig";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getAllLifts = async (): Promise<Lift[]> => {
  const response = await fetch(`${API_URL}/lifts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch lifts, please try again later.');
}

const getLiftById = async (liftId: string): Promise<Lift> => {
  const response = await fetch(`${API_URL}/lifts/${liftId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch lift, please try again later.');
}

const getLiftsByDomainId = async (domainId: string): Promise<Lift[]> => {
  const response = await fetch(`${API_URL}/lifts/domain/${domainId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch lifts, please try again later.');
}

const getLiftsByStatus = async (status: LiftStatus): Promise<Lift[]> => {
  const response = await fetch(`${API_URL}/lifts/status/${status}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch lifts, please try again later.');
}

const getLiftsByDomainIdAndStatus = async (domainId: string, status: LiftStatus): Promise<Lift[]> => {
  const response = await fetch(`${API_URL}/lifts/domain/${domainId}/status/${status}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch lifts, please try again later.');
}

export default { getAllLifts, getLiftById, getLiftsByDomainId, getLiftsByStatus, getLiftsByDomainIdAndStatus };
