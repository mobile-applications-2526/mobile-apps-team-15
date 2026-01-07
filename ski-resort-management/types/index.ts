export type Loan = {
  id: string;
  userId: string,
  startTime: Date,
  endTime: Date,
  materials: string[],
  returnTime: Date
  isActive: boolean
};

export type LoanRequestDto = {
  userId: string,
  startTime: Date,
  endTime: Date,
  materials: string[]
}

export type Material = {
  id: string,
  name: string,
  pricePerHour: number,
  pricePerDay: number,
  description: string,
  imageUrl: string
  available: boolean
}

export type DurationType = "hours" | "days";

export type SkiPass = {
  id: string,
  name: string,
  price: number,
  skiPassType: SkiPassType,
  startDate: Date,
  endDate: Date,
  user: User
}

export enum SkiPassType {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD"
}

export type SkiPassRequestDto = {
  name: string,
  skiPassType: SkiPassType,
  userId: string,
  endDateTime: Date
}

export type User = {
  id: string,
  uid: string,
  firstName: string,
  lastName: string,
  email: string
}

export type RegisterUserDto = {
  uid: string,
  firstName: string,
  lastName: string,
  email: string
}

export type Domain = {
  id: string,
  name: string,
  latitude: string,
  longitude: string,
  allowedSkiPasses: SkiPassType[]
}

export type Slope = {
  id: string,
  slopeName: string,
  difficulty: SlopeDifficulty,
  status: SlopeStatus,
  domain: Domain
}

export enum SlopeDifficulty {
  GREEN = "GREEN",
  BLUE = "BLUE",
  RED = "RED",
  BLACK = "BLACK"
}

export enum SlopeStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}

export type Lift = {
  id: string,
  liftNumber: 1,
  liftStatus: LiftStatus,
  domain: Domain
}

export enum LiftStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}
