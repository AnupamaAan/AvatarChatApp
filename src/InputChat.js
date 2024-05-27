import { useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./Navbar/Nav";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { listedChats } from "./Redux/Action/ActionCreator";
import { TypeAnimation } from "react-type-animation";
function InputChat() {
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const { value } = useParams();
  // console.log(value);
  const navigate = useNavigate();
  // const inputmessage = (e) => {
  //   e.preventDefault()
  //   navigate('/inputchat')
  // }
  // chat list api
  const [chatList, setChatList] = useState([]);
  const [chatListHandler, setChatListHandler] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // const storedAccessToken = localStorage.getItem('accesstoken');
    // console.log(storedAccessToken);
    dispatch(
      listedChats((res) => {
        // console.log(res);
        if ("data" in res) {
          setChatList(res.data);
          // console.log(res.data)
        }
      })
    );
    // if(storedAccessToken){
    //   setAccessToken(storedAccessToken)
    // }
  }, [chatListHandler]);
  // chat list api
  const [filteredData, setFilteredData] = useState({
    chat_response : undefined 
  });
  // console.log(value,'valueeee');
  useEffect(() => {
    const tempData = chatList.filter((item) => item.id === Number(value))[0];

    setFilteredData(tempData);
    // console.log(filteredData);
    // console.log(tempData,'temp');
  }, [chatList, value]);
  // setFilteredData(tempData);
  // console.log(filteredData);
  const videoEl = useRef(null);
  return (
    <div className="App">
      <div className="wrap">
        <Nav chatList={chatList} />
        <div className="inputchat-container">
          <div className="chat-sec">
            {filteredData?.video_url !== null ? (
              <video
                className="video-container"
                style={{
                  maxWidth: "100%",
                  width: "auto",
                  maxWidth: "270px",
                  margin: "0 auto",
                }}
                playsInline
                autoPlay
                loop={false}
                unmuted
                // muted
                controls={false}
                alt="All the devices"
                src={baseurl+ filteredData?.video_url}
                ref={videoEl}
              />
            ) : (
              <video
                className="video-container"
                style={{
                  maxWidth: "100%",
                  width: "auto",
                  maxWidth: "270px",
                  margin: "0 auto",
                }}
                playsInline
                autoPlay
                loop={false}
                unmuted
                // muted
                controls={false}
                alt="All the devices"
                src="/video/sample_video.mp4"
                ref={videoEl}
              />
            )}
            <div className="col-md-10 mx-auto">
              <div className="chat-heading">
                <div className="chat-heading-p">
                  {filteredData?.text !== undefined ? (
                    <p>{filteredData.text}</p>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <img
                    style={{ width: "45px", borderRadius: "50px" }}
                    src="/img/photo-1633332755192-727a05c4013d.jpg"
                  />
                </div>
              </div>
              <div className="chat-list-wrap">
                <div className="icon-c">
                  <img src="/img/typechat-logo-inner.svg" />
                </div>
                <div className="chat-p">
                  {filteredData?.chat_response !== undefined && filteredData?.id === Number(value)? (
                    <>
                      <TypeAnimation
                        className=""
                        sequence={[
                          `${filteredData.chat_response}`,
                          500,
                        ]}
                        wrapper="span"
                        speed={35}
                        repeat={0}
                      />
                      {/* {filteredData.chat_response} */} 
                    </>
                  ) : (
                    <>
                      {" "}
                      <p>
                        Loading....
                      </p>
                      {/* <TypeAnimation
                        className=""
                        sequence={[
                          `${filteredData.chat_response}`,
                          500,
                        ]}
                        wrapper="span"
                        speed={35}
                        repeat={0}
                      /> */}
                    </>
                  )}
                </div>
                <div className="chat-ac">
                  <div className="ic-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinejoin="round"
                          d="M15.5 4H18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2.5"
                        />
                        <path
                          strokeLinejoin="round"
                          d="M8.621 3.515A2 2 0 0 1 10.561 2h2.877a2 2 0 0 1 1.94 1.515L16 6H8l.621-2.485Z"
                        />
                        <path d="M9 12h6m-6 4h6" />
                      </g>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M1.36 9.495v7.157h3.03l.153.018c2.813.656 4.677 1.129 5.606 1.422c1.234.389 1.694.484 2.531.54c.626.043 1.337-.198 1.661-.528c.179-.182.313-.556.366-1.136a.681.681 0 0 1 .406-.563c.249-.108.456-.284.629-.54c.16-.234.264-.67.283-1.301a.682.682 0 0 1 .339-.57c.582-.337.87-.717.93-1.163c.066-.493-.094-1.048-.513-1.68a.683.683 0 0 1 .176-.936c.401-.282.621-.674.676-1.23c.088-.886-.477-1.541-1.756-1.672a9.42 9.42 0 0 0-3.394.283a.68.68 0 0 1-.786-.95c.5-1.058.778-1.931.843-2.607c.085-.897-.122-1.547-.606-2.083c-.367-.406-.954-.638-1.174-.59c-.29.062-.479.23-.725.818c-.145.348-.215.644-.335 1.335c-.115.656-.178.952-.309 1.34c-.395 1.176-1.364 2.395-2.665 3.236a11.877 11.877 0 0 1-2.937 1.37a.676.676 0 0 1-.2.03H1.36Zm-.042 8.52c-.323.009-.613-.063-.856-.233c-.31-.217-.456-.559-.459-.953l.003-7.323c-.034-.39.081-.748.353-1.014c.255-.25.588-.368.94-.36h2.185A10.505 10.505 0 0 0 5.99 6.95c1.048-.678 1.82-1.65 2.115-2.526c.101-.302.155-.552.257-1.14c.138-.789.224-1.156.422-1.628c.41-.982.948-1.462 1.69-1.623c.73-.158 1.793.263 2.465 1.007c.745.824 1.074 1.855.952 3.129c-.052.548-.204 1.161-.454 1.844a10.509 10.509 0 0 1 2.578-.056c2.007.205 3.134 1.512 2.97 3.164c-.072.712-.33 1.317-.769 1.792c.369.711.516 1.414.424 2.1c-.106.79-.546 1.448-1.278 1.959c-.057.693-.216 1.246-.498 1.66a2.87 2.87 0 0 1-.851.834c-.108.684-.335 1.219-.706 1.595c-.615.626-1.714.999-2.718.931c-.953-.064-1.517-.18-2.847-.6c-.877-.277-2.693-.737-5.43-1.377H1.317Zm1.701-8.831a.68.68 0 0 1 .68-.682a.68.68 0 0 1 .678.682v7.678a.68.68 0 0 1-.679.681a.68.68 0 0 1-.679-.681V9.184Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-10 mx-auto"
              style={{ marginTop: "auto" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputChat;
