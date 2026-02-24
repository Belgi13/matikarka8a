import type { ComponentType } from 'react'
import {
  Activity,
  Compass,
  Divide,
  Edit3,
  Hexagon,
  Plus,
  Square,
  TrendingUp,
} from 'react-feather'

type IconProps = { size?: number; className?: string }

const ICONS: Record<string, ComponentType<IconProps>> = {
  rovnice: Plus,
  zlomky: Divide,
  slovne: Edit3,
  trojuholnik: Compass,
  stvoruholnik: Square,
  lichobeznik: Hexagon,
  obvod: TrendingUp,
  vyska: Activity,
}

export default function TopicIcon({
  topicId,
  size = 20,
  className,
}: {
  topicId: string
  size?: number
  className?: string
}) {
  const Icon = ICONS[topicId] ?? Activity
  return <Icon size={size} className={className} />
}
