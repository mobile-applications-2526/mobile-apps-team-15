import { Material } from "@/types";
import { auth } from "@/services/FirebaseConfig";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getAllMaterials = async (): Promise<Material[]> => {
  const response = await fetch(`${API_URL}/materials`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else {
    console.log(await auth.currentUser.getIdToken());
    console.log(await response.json());
    throw new Error('Failed to fetch materials, please try again later.');
  }
}

const getAllAvailableMaterials = async (): Promise<Material[]> => {
  const response = await fetch(`${API_URL}/materials/available`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch available materials, please try again later.');
}

const getMaterialById = async (id: string): Promise<Material> => {
  const response = await fetch(`${API_URL}/materials/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch material, please try again later.');
}

export default { getAllMaterials, getAllAvailableMaterials, getMaterialById };
