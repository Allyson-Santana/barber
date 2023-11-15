import { Timestamp } from "firebase/firestore"

export type ClientModel = {
    id: string
    name: string
    email: string
    phone: string
    photoURL?: string
}

export type ServiceModel = {
    id: string
    name: string
    duration_in_minute: number
}

export type BarberModel = {
    id: string
    name: string
    cpf: string
    phone: string
    hour_pause: string // Example: '14:30'
}

export type SchedulingModel = {
    id: string
    date: Timestamp
    client: ClientModel
    service: ServiceModel
    barber: BarberModel
    stars: number
}