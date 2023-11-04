export type Id = {
    id: string
}

export type ClientModel = {
    name: string
    email: string
    phone: string
    photoURL?: string
}

export type ServiceModel = {
    name: string
    duration_in_minute: number
}

export type BarberModel = {
    name: string
    cpf: string
    phone: string
    hour_pause: string // Example: '14:30'
}