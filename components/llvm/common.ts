export type CardColor = 'blue' | 'teal' | 'cyan' | 'orange' | 'green' | 'purple' | 'red'

export interface Card {
  id: string
  icon: string
  title: string
  color: CardColor
  description: string
}
