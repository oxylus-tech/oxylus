import {Repository} from 'pinia-orm'

export * from './model'
export * from './auth'
import type { Model } from './model'

export type Repos={[s: string]: Repository<Model>}
