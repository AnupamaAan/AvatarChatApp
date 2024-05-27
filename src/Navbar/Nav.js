import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css';
import { listedChats } from '../Redux/Action/ActionCreator';


function Nav({chatList}) {
  const navigate = useNavigate()

  const inputmessage = (e,value) => {
    e.preventDefault()
    navigate(`/inputchat/${value}`);
  }
  // useEffect(() => {
  //   const storedAccessToken = localStorage.getItem('accesstoken');
  //   console.log(storedAccessToken);
  //   dispatch(listedChats((res) => {
  //     console.log(res);
  //     if ('data' in res) {
  //       setChatList(res.data);
  //       console.log(res.data)
  //     }
  //   }))
  // }, [])
  return (
    <div>
      <div className="side-nav">
        <div style={{
          maxHeight: "200px",
          marginBottom: "20px"
        }}>
          <img className='logo-dashboard' src="/img/logo.svg" width="100%" />
        </div>
        <div className="w-100 mb-1 d-flex" style={{ gap: '0.5rem' }}>
          <button className="new-chat " onClick={()=>{navigate('/dashboard')}}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1={12} y1={5} x2={12} y2={19} />
              <line x1={5} y1={12} x2={19} y2={12} />
            </svg>
            New chat
          </button>
          <button className="sidebar-trigger">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
              <line x1={9} y1={3} x2={9} y2={21} />
            </svg>
          </button>
        </div>
        <div className="recent-chats">
          <h4 className="date-chat">Recent Chats</h4>
          {chatList.map((item) => {
            return (
              <div className="chat-li" key={item.id}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="currentColor"
                    d="m11.5 13.5l.157-.475l-.218-.072l-.197.119l.258.428Zm2-2l-.421-.27l-.129.202l.076.226l.474-.158Zm1 2.99l-.157.476a.5.5 0 0 0 .631-.634l-.474.159Zm-3.258-1.418c-.956.575-2.485.919-3.742.919v1c1.385 0 3.106-.37 4.258-1.063l-.516-.856ZM7.5 13.99c-3.59 0-6.5-2.909-6.5-6.496H0a7.498 7.498 0 0 0 7.5 7.496v-1ZM1 7.495A6.498 6.498 0 0 1 7.5 1V0A7.498 7.498 0 0 0 0 7.495h1ZM7.5 1C11.09 1 14 3.908 14 7.495h1A7.498 7.498 0 0 0 7.5 0v1ZM14 7.495c0 1.331-.296 2.758-.921 3.735l.842.54C14.686 10.575 15 8.937 15 7.495h-1Zm-2.657 6.48l3 .99l.314-.949l-3-.99l-.314.949Zm3.631.357l-1-2.99l-.948.316l1 2.991l.948-.317Z"
                  />
                </svg>
                <div className="chat-li-txt ">
                  <a
                    href="#"
                    onClick={(e)=>{inputmessage(e,item.id)}}
                    style={{ textDecoration: 'none', color: '#f7f2f5' }}
                  >
                    {item.text!== undefined?
                    <>
                    {item.text}
                    </>
                    :<></>
                    }
                  </a>
                </div>
              </div>
            )
          })}
        </div>
        <div className="user-info">
          <img
            src="/img/photo-1633332755192-727a05c4013d.jpg"
            alt=""
            width="40px"
          />
          <div className="user-txt">Tech User</div>
        </div>
      </div>
    </div>
  )
}

export default Nav
