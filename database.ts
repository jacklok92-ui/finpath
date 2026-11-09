import Dexie, { type EntityTable } from 'dexie'

export interface AppMetadata {
  key: string
  value: string
  updatedAt: string
}

export interface Client {
  id: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  notes: string
  createdAt: string
  updatedAt: string
}

class FinPathDatabase extends Dexie {
  metadata!: EntityTable<AppMetadata, 'key'>
  clients!: EntityTable<Client, 'id'>

  constructor() {
    super('FinPathDatabase')
    this.version(1).stores({
      metadata: '&key, updatedAt',
      clients: '&id, fullName, email, phone, createdAt, updatedAt'
    })
  }
}

export const db = new FinPathDatabase()
