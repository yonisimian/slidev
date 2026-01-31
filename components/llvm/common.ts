export type CardColor = 'blue' | 'teal' | 'cyan' | 'orange' | 'green' | 'purple'

export interface Card {
  id: string
  icon: string
  title: string
  color: CardColor
  description: string
}
