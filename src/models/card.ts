import type { Category } from "./category"
import type { User } from "./user"

export interface CardCollection {
    collectionId: string,
    user: User,
    title: string,
    description: string,
    categories: Category[],
    cardCount: number,
    cards: CardModel[],
}

export type CardModel = {
    cardId: string,
    front: string,
    back: string,
    notes: string
}