import React from 'react'

const HeadComp = ({First,Second}) => {
  return (
    <div className="col-lg-4 column column-left d-flex justify-content-center align-items-center">
            <h1 className="text-center sign-up-heading">
              {First} <br /> {Second}
            </h1>
          </div>
  )
}

export default HeadComp
