import { useNavigate } from "react-router-dom";
import "./style.css";
import React, { useRef, useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Nav from "../Navbar/Nav";
import { listedChats, ngrokProcess, queryQuestion } from "../Redux/Action/ActionCreator";
import { useDispatch } from "react-redux";

function Dashboard({ setChatResponse }) {
  // chat list api
  const navigate = useNavigate();

  const [chatList, setChatList] = useState([]);
  const [chatListHandler, setChatListHandler] = useState(false);
  const [resHandler, setResHandler] = useState(false);
  const [isNull, setIsNull] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  /////
  useEffect(() => {
    // console.log(resHandler,queryId,'handler');
    if (resHandler && queryId !== "") {
      dispatch(
        listedChats((res) => {
          if ("data" in res) {
            // console.log(res.data,'dataaaaaa');
            const tempData = res.data.filter((item) => item.id === queryId)[0];
            if (tempData?.chat_response !== null) {
              // console.log('null changeddd');
              navigate(`/inputchat/${tempData.id}`);
            } else {
              setIsNull(!isNull);
              // console.log('still null');
            }
          }
        })
      );
    }
  }, [isNull]);

  ////////

  useEffect(() => {
    // const storedAccessToken = localStorage.getItem('accesstoken');
    // console.log(storedAccessToken);
    dispatch(
      listedChats((res) => {
        // console.log(res);
        if ("data" in res) {
          setChatList(res.data);
          // console.log(res.data);
          // navigate(`/inputchat/${res.data.id}`);
        }
      })
    );
    // if(storedAccessToken){
    //   setAccessToken(storedAccessToken)
    // }
  }, [chatListHandler]);
  // chat list api
  // question query state //
  const [queryState, setQueryState] = useState("");
  useEffect(() => {
    // console.log(queryState, "query");
  }, [queryState]);

  // useEffect(() => {
  //   dispatch(queryQuestion( (res) => {
  //     console.log(res,'feefe')
  //   })
  //   )

  // }, [])

  const inputRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [statename, setName] = useState({
    input_message: "",
  });
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };
  useEffect(() => {
    attemptPlay();
  }, []);
  // const inputmessage = (e) => {
  //   e.preventDefault()
  //   navigate('/inputchat')
  // }
  const inputmessagechange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setName({ ...statename, [name]: value });
    if (value === "") {
      resetTranscript("");
    }
    // console.log(value);
    // console.log(transcript,'trans');
    // console.log(statename,'statename');
  };
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    ,
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const [queryId, setQueryId] = useState("");
  const microphoneRef = useRef(null);
  const videoEl = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const sendmessage = (event) => {
    event.preventDefault();
    dispatch(ngrokProcess((res)=>{
      if('message' in res){
        console.log(res);
      }
    }))
    stopHandle();
    setIsLoading(true);
    setChatListHandler(!chatListHandler);
    if (statename.input_message === "" && transcript !== "") {
      setName({ ...statename, input_message: transcript });
      // console.log(statename, "if statename");
      // console.log(transcript, "if transcript");
      setQueryStateWithCallback(transcript);
    } else {
      setQueryStateWithCallback(statename.input_message);
      // console.log(statename, "else");
    }
  };

  const setQueryStateWithCallback = (newQueryState) => {
    setQueryState(newQueryState); // Assuming setQueryState is synchronous
    // Now, you can call the API after updating queryState
    var formData = new FormData();
    formData.append("text", newQueryState); // Use newQueryState here
    dispatch(
      queryQuestion(formData, (res) => {
        if ("data" in res) {
          console.log(res);
          setIsLoading(true);
          setQueryId(res.data.id);
          setResHandler(true);
          setIsNull(!isNull);
          setChatResponse(res.data.chat_response);
          // navigate(`/inputchat/${res.data.id}`);
        }
      })
    );
  };

  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  const Removeitem = (item) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(item), 1);
    setFileList(updatedList);
  };
  // const handleClick = () => {
  //   inputRef.current.click();
  // };
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (fileObj) {
      const updatedList = [...fileList, fileObj];
      setFileList(updatedList);
      console.log(updatedList);
    }
    if (!fileObj) {
      return;
    }

    event.target.value = null;
  };
  const formatSizeUnits = (bytes) => {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + " GB";
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes > 1) {
      bytes = bytes + " bytes";
    } else if (bytes === 1) {
      bytes = bytes + " byte";
    } else {
      bytes = "0 bytes";
    }
    return bytes;
  };
  return (
    <div className="App">
      {/* <img className='logo-dashboard' src="img/logo.svg" width="100%" /> */}
      <div className="wrap">
        <Nav chatList={chatList} />
        <div className="chat-sec">
          <div className="row m-0">
            <div className="col-md-2  mx-auto mt-5 mb-5">
              {/* <img src="img/logo.svg" width="100%" /> */}
              <video
                style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
                playsInline
                loop
                muted
                controls={false}
                alt="All the devices"
                src="/video/ai_avatar.mp4"
                ref={videoEl}
              />

              {/* <video width="320" height="240" controls autoplay="autoplay">
                <source src="img/ai_avatar_template_vid.mp4" type="video/mp4" />
              </video> */}
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="icon-msg">
                <i className="fa-sharp fa-regular fa-comment"></i>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                debitis ex maiores ipsum, quisquam{" "}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="icon-msg">
                <i className="fa-sharp fa-regular fa-comment"></i>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                debitis ex maiores ipsum, quisquam{" "}
              </p>
            </div>
          </div>

          <div className="col-md-10 mx-auto" style={{ marginTop: "auto" }}>
            <br></br>

            {fileList.length > 0 ? (
              <div className="upload-files">
                {fileList.map((item, index) => (
                  <div key={index} className="ready-files">
                    <div className="ready-item-d">
                      <p className="item-name">
                        {item.name} &nbsp;&nbsp;{formatSizeUnits(item.size)}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a
                          href="# "
                          style={{ color: "black", textDecoration: "none" }}
                          className="remove-item"
                          onClick={() => {
                            Removeitem(item);
                          }}
                        >
                          X
                        </a>
                      </p>{" "}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div className="microphone-status" style={{ color: "white" }}>
              {isListening ? "Listening........." : ""}
            </div>
            <div className="chat-text-area">
              <textarea
                style={{
                  textAlign: "left",
                  overflow: "hidden",
                  resize: "none",
                  border: "1px solid black", // Set border for all sides
                  width: "100%",
                }}
                type="text"
                placeholder="send a message"
                value={
                  statename.input_message ? statename.input_message : transcript
                }
                name="input_message"
                onChange={inputmessagechange}
              />
              {isLoading  ? (
             <div class="ring">Loading
             <span></span>
           </div>
              ) : (
                <></>
              )}
              {/* <textarea
                style={{
                  textAlign: 'left',
                  padding: '5px',
                  width: '100%',
                  borderRadius: '6px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word ',
                  overflow: 'hidden',
                }}
                wrap="hard"
                type="text"
                placeholder="send a message"
                value={
                  statename.input_message ? statename.input_message : transcript
                }
                name="input_message"
                onChange={inputmessagechange}
              /> */}

              <div className="chat-action">
                <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                />
                {transcript && (
                  <button onClick={handleReset} style={{ fontSize: "20px" }}>
                    x
                  </button>
                )}
                {/* <button onClick={handleClick} style={{ color: "white" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 7.91V16a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V6a4 4 0 0 0-4-4v0a4 4 0 0 0-4 4v9.182a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V8"
                    />
                  </svg>
                </button> */}
                {isListening ? (
                  <button ref={microphoneRef} onClick={stopHandle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      className="bi bi-mic"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />{" "}
                      <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />{" "}
                    </svg>
                  </button>
                ) : (
                  <>
                    <button
                      ref={microphoneRef}
                      onClick={handleListing}
                      style={{ color: "white" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="currentColor"
                        className="bi bi-mic"
                        viewBox="0 0 16 16"
                      >
                        {" "}
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />{" "}
                        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />{" "}
                      </svg>
                    </button>
                  </>
                )}
                <button onClick={sendmessage} style={{ color: "white" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.465c-1.415.67-3.017-.472-2.844-2.028L5 12Zm0 0h7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
