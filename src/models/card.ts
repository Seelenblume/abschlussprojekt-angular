import type { Category } from "./category"
import type { User } from "./user"


export interface CardCollectionShort {
    id: string,
    user: User,
    title: string,
    description: string,
    categories: Category[],
    favorite: boolean,
    cardCount: number,
}

export interface CardCollection extends CardCollectionShort {
    cards: CardModel[],
}


export type CardModel = {
    id: string,
    front: string,
    back: string,
    notes: string
}

export const Color = {
    RED: "red",
    BLUE: "blue",
} as const