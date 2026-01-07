import { Loan, LoanRequestDto } from "@constants/types";
import { auth } from "@/services/FirebaseConfig";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getAllLoansByUserId = async (userId: string): Promise<Loan[]> => {
  const response = await fetch(`${API_URL}/loans/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch loans, please try again later.');
}

const getLoanById = async (id: string): Promise<Loan> => {
  const response = await fetch(`${API_URL}/loans/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    }
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to fetch loan, please try again later.');
}

const postLoan = async ({ userId, startTime, endTime, materials }: LoanRequestDto): Promise<Loan> => {
  const response = await fetch(`${API_URL}/loans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    },
    body: JSON.stringify({
      userId,
      startTime,
      endTime,
      materials
    })
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to create loan, please try again later.');
}

const returnLoan = async (loanId: string, returnTime: Date): Promise<Loan> => {
  const response = await fetch(`${API_URL}/loans/return`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await auth.currentUser.getIdToken()
    },
    body: JSON.stringify({
      loanId,
      returnTime
    })
  });
  if (response.ok) return await response.json();
  else throw new Error('Failed to return loan, please try again later.');
}

export default { getAllLoansByUserId, getLoanById, postLoan, returnLoan };
