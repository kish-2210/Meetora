"use client"
import { useState, useEffect } from "react"
import HomeCard from "./HomeCard"
import HomeCards from "./HomeCards"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { toast } from "sonner"
import Loader from "./Loader"
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker'

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
}

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(undefined)
  const [dialogSchedule, setDialogSchedule] = useState(false);

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState(initialValues);
  const [callDetails, setCallDetails] = useState<Call>();
  const [shouldCreateMeeting, setShouldCreateMeeting] = useState(false);



  const createMeeting = async () => {
    console.log(user, client, "first");
    if (!user) return router.push('/sign-in')
    if (!client) return router.push('/')

    try {
      if (!values.dateTime) {
        toast('Please select a date and time', {
          duration: 3000,
          className: 'bg-gray-300 rounded-3xl py-8 px-5 justify-center'
        });
        return;
      }

      const id = crypto.randomUUID()
      const call = client.call("default", id);


      if (!call) throw new Error("Failed to initialize call")


      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting'

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      await call.updateCallMembers({
        update_members: [{ user_id: user.id }],
      })

      if (meetingState === 'isInstantMeeting') {
        console.log(call.id);
        router.push(`/meeting/${call.id}`)
        toast("Setting up Your meeting", {
          duration: 3000,
          className: '!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center',
        });
        setCallDetails(call)
      }

      if (meetingState === 'isScheduleMeeting') {
        // router.push('/upcoming')
        toast(`Your meeting is scheduled at ${values.dateTime}`, {
          duration: 5000,
          className: '!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center',
        });
        setCallDetails(call)
      }




    }
    catch (err: any) {
      toast(`Failed to create Meeting`, {
        duration: 3000,
        className: '!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center',
      }
      )
    }
  }

  useEffect(() => {
    if (meetingState) {
      console.log(meetingState);
      createMeeting();
    }
  }, [meetingState]);

  if (!client || !user) return <Loader />

 const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* <HomeCards
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        dialogTitle="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => {
          console.log(meetingState, "from cards");
          setMeetingState("isInstantMeeting");
          console.log(meetingState, "from cards")
        }}
      />

      <HomeCards
         img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        dialogTitle="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => {
          console.log(meetingState,"from cards")
          setMeetingState('isScheduleMeeting')
          console.log(meetingState,"from cards")
        }}
      /> */}

      {/* instant meeting */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => {
          console.log(meetingState, "from cards");
          setMeetingState("isInstantMeeting");
          console.log(meetingState, "from cards")
        }}
      />


      {/* Schedule meeting */}
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => {
          setDialogSchedule(true)
        }}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={dialogSchedule === true}
          onClose={() => { setDialogSchedule(false) }}
          dialogTitle="Schedule a meeting"
          handleClick={() => { setMeetingState("isScheduleMeeting") }}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 bg-button-1 text-button-2"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value })
              }} />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-button-1 p-2 focus:outline-none text-button-2"
              />
            
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={dialogSchedule === true}
          onClose={() => { setDialogSchedule(false) }}
          dialogTitle="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Link Copied")
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        >


        </MeetingModal>)}


      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => { router.push('/recordings') }}

      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => {
          console.log(meetingState, "from cards")
          setMeetingState("isJoiningMeeting")
          console.log(meetingState, "from cards")
        }}

      />
      {/* <MeetingModal 
    isOpen={meetingState === 'isInstantMeeting'}
    onClose={()=>{setMeetingState(undefined)}}
    dialogTitle = "Start an Instant Meeting"
    className = "text-center"
    buttonText ="Start Meeting"
    handleClick={()=>{ setMeetingState("isInstantMeeting")}}
    /> */}


    </section>
  )
}

export default MeetingTypeList
