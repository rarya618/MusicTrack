import { Entry } from "./Entry"

export type Track = {
    id: string,
    name: string,
    artist: string,
    data?: Entry[]
}

export const sampleTrack: Track = {id: "sample", name:"sample", artist:"sample"}