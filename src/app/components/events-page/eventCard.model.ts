// INTERFACCIA PER LA EVENT CARD CON I PARAMETRI DA PRENDERE

import { Interface } from "readline"

export interface Card {
  image: string,
  id: number,
  title: string,
  date: number,
  place: string,
  description: string
}