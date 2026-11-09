import Dexie, { type EntityTable } from 'dexie'

export interface AppMetadata {
  key: string
  value: string
  updatedAt: string
}

class FinPathDatabase extends Dexie {
  metadata!: EntityTable<AppMetadata, 'key'>

  constructor() {
    super('FinPathDatabase')
    this.version(1).stores({
      metadata: '&key, updatedAt'
    })
  }
}

export const db = new FinPathDatabase()