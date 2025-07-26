import React from 'react'

const meeting = ({params}:{params : {id : string}}) => {
  return (
    <div>
      meeting room: #{params.id}
    </div>
  )
}

export default meeting
