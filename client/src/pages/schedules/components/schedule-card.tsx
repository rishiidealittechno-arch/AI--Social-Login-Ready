import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"

export type ScheduleAttendee = {
  name: string
  avatar: string
  fallback: string
}

export type Schedule = {
  id: string
  category: string
  title: string
  time: string
  date?: string
  meetingLink: string
  extraAttendees: number
  attendees: ScheduleAttendee[]
}

export function ScheduleCard({ schedule }: { schedule: Schedule }) {
  return (
    <Item variant={'muted'}>
      <ItemContent>
        <div className="mb-3">
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </div>

        <ItemTitle>{schedule.category}</ItemTitle>
        <ItemDescription>{schedule.title}</ItemDescription>
        <ItemDescription>{schedule.date}</ItemDescription>
      </ItemContent>
    </Item>
  )
}
