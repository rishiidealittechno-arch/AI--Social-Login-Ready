import type { Schedule } from "./components/schedule-card"

const attendees = {
  team: [
    {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      fallback: "SC",
    },
    {
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/150?img=12",
      fallback: "JW",
    },
    {
      name: "Maya Patel",
      avatar: "https://i.pravatar.cc/150?img=5",
      fallback: "MP",
    },
    {
      name: "Alex Rivera",
      avatar: "https://i.pravatar.cc/150?img=8",
      fallback: "AR",
    },
  ],
  product: [
    {
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=9",
      fallback: "ED",
    },
    {
      name: "Chris Lee",
      avatar: "https://i.pravatar.cc/150?img=15",
      fallback: "CL",
    },
    {
      name: "Jordan Kim",
      avatar: "https://i.pravatar.cc/150?img=20",
      fallback: "JK",
    },
    {
      name: "Taylor Brooks",
      avatar: "https://i.pravatar.cc/150?img=32",
      fallback: "TB",
    },
  ],
  engineering: [
    {
      name: "Noah Martinez",
      avatar: "https://i.pravatar.cc/150?img=11",
      fallback: "NM",
    },
    {
      name: "Olivia Brown",
      avatar: "https://i.pravatar.cc/150?img=23",
      fallback: "OB",
    },
    {
      name: "Ethan Clark",
      avatar: "https://i.pravatar.cc/150?img=33",
      fallback: "EC",
    },
    {
      name: "Ava Thompson",
      avatar: "https://i.pravatar.cc/150?img=44",
      fallback: "AT",
    },
  ],
}

export const todaysMeetings: Schedule[] = [
  {
    id: "today-1",
    category: "Design System",
    title: "Team Meeting",
    time: "10:30 am - 11:45 am",
    meetingLink: "meet./wrc-pgqr-xix",
    extraAttendees: 32,
    attendees: attendees.team,
  },
  {
    id: "today-2",
    category: "Product Design",
    title: "Sprint Review",
    time: "1:00 pm - 2:00 pm",
    meetingLink: "meet./kpd-hjmn-rtw",
    extraAttendees: 18,
    attendees: attendees.product,
  },
  {
    id: "today-3",
    category: "Engineering",
    title: "Architecture Sync",
    time: "3:15 pm - 4:00 pm",
    meetingLink: "meet./xlm-qwer-abc",
    extraAttendees: 12,
    attendees: attendees.engineering,
  },
]

export const upcomingMeetings: Schedule[] = [
  {
    id: "future-1",
    category: "Client Success",
    title: "Onboarding Walkthrough",
    date: "Friday, June 19, 2026",
    time: "9:00 am - 9:45 am",
    meetingLink: "meet./onb-klmn-xyz",
    extraAttendees: 8,
    attendees: attendees.product,
  },
  {
    id: "future-2",
    category: "Marketing",
    title: "Campaign Planning",
    date: "Monday, June 22, 2026",
    time: "11:00 am - 12:00 pm",
    meetingLink: "meet./cmp-plan-202",
    extraAttendees: 14,
    attendees: attendees.team,
  },
  {
    id: "future-3",
    category: "Engineering",
    title: "Release Retrospective",
    date: "Tuesday, June 23, 2026",
    time: "2:30 pm - 3:30 pm",
    meetingLink: "meet./rel-retro-88",
    extraAttendees: 21,
    attendees: attendees.engineering,
  },
  {
    id: "future-4",
    category: "Leadership",
    title: "Quarterly Strategy Review",
    date: "Wednesday, June 24, 2026",
    time: "10:00 am - 11:30 am",
    meetingLink: "meet./qtr-strat-01",
    extraAttendees: 6,
    attendees: attendees.team,
  },
  {
    id: "future-5",
    category: "Design System",
    title: "Component Library Demo",
    date: "Thursday, June 25, 2026",
    time: "4:00 pm - 4:45 pm",
    meetingLink: "meet./cmp-demo-77",
    extraAttendees: 27,
    attendees: attendees.product,
  },
]
