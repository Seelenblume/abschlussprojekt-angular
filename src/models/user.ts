import type { CardCollection } from "./card"

export type User = {
    userId: string,
    name: string,
    collections?: CardCollection[],
}