import type { Category } from "./category"
import type { User } from "./user"

export interface CardCollection {
    collectionId: string,
    user: User,
    title: string,
    description: string,
    categories: Category[],
    favorite: boolean,
    cardCount: number,
    color: typeof CollectionColor
    cards: CardModel[],
}


export type CardModel = {
    cardId: string,
    front: string,
    back: string,
    notes: string
}

export const CollectionColor = {
    RED: "red",
    BLUE: "blue",
} as const