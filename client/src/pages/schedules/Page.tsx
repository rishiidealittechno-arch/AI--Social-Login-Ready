import type { ReactNode } from "react"
import { ScheduleCard } from "./components/schedule-card"
import { todaysMeetings, upcomingMeetings } from "./data"

type ScheduleSectionProps = {
  title: string
  description: string
  children: ReactNode
}

function ScheduleSection({ title, description, children }: ScheduleSectionProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground md:text-base">{description}</p>
      </div>
      {children}
    </section>
  )
}

export default function Page() {

  return (
    <div className="space-y-8 p-4 md:p-6">
      <ScheduleSection
        title="Today's Meetings"
        description="All meetings scheduled for today. Join directly from the cards below."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {todaysMeetings.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </ScheduleSection>

      <ScheduleSection
        title="Upcoming Meetings"
        description="Your next five scheduled meetings across the coming days."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {upcomingMeetings.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </ScheduleSection>
    </div>
  )
}
