// import { useState } from "react";
import Post from "./Post";
import Find from "./Find";
import All from "./All";
// import Error from "./Error";
// import Status from "./Status";
// import useVisualMode from "../helpers/hooks/useVisualMode";
import JobToggle from "../JobToggle/JobToggle";
import "./Jobs.css";
import Chat from "../Chat/Chat";
import ChatList from '../Chat/ChatList'
import { DomainPropTypes } from "@material-ui/pickers/constants/prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { Transition } from "react-transition-group";
import Login from '../Login/Login'
import { useCookies, withCookies } from 'react-cookie'

// const POST = "POST";
// const FIND = "FIND";
// const ALL = "ALL";
// const SAVING = "SAVING";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

function Jobs(props) {
  console.log(props)
  const [cookies] = useCookies()

  // const [jobView, setJobView] = useState(ALL)
  // const { mode, transition, back } = useVisualMode(ALL);

  // function save(job) {
  //   const newJob = {
  //     // id: 1,
  //     // client_id: 1,
  //     // helper_id: 2,
  //     // category_id: 3,
  //     name: "Babysit a lil' brat",
  //     description: "Take care of this POS for me thanks",
  //     // lat: 49.28129,
  //     // lng: 123.115121,
  //     price: 1000,
  //     per_hr: "FALSE",
  //     // start_time: "2021-02-26 18:00:00",
  //     // end_time: "2021-02-27 00:00:00",
  //     // status: "POSTED",
  //   };
  //   // transition(SAVING);
  //   props
  //     .savePin(props.id)
  //     .then(() => setJobView(ALL))
  //     // .catch((error) => transition(ERROR_SAVE, true));
  // }

  return (
    <>
      <JobToggle state={props.state} setJobView={props.setJobView} />
      {props.state.jobView === "FIND" && <Find />}
      {!props.cookies.user && props.state.jobView !== "FIND" &&<Login cookies={cookies} removeCookie={props.removeCookie}/>}
      {props.state.jobView === "POST" && props.cookies.user && <Post state={props.state} />}
      {props.state.jobView === "ALL" && cookies.user && <All />}
      {props.state.jobView === "MESSAGE" && cookies.user && (
        <ChatList sendMessage={props.sendMessage} setJobView={props.setJobView} getConversations={props.getConversations} setChat={props.setChat}/>
        )}
        {props.state.jobView === "CHAT" && cookies.user && <Chat getMessages={props.getMessages} state={props.state} setMessages={props.setMessages} sendMessage={props.sendMessage} cookies={cookies}/>}
      <TransitionGroup className="job-container">
        {props.state.jobView === "POST" && (
          <CSSTransition
            key={1}
            timeout={500}
            classNames="slide"
            in={props.state.jobView === "POST"}
          >
            <div>
              <Post
                state={props.state}
                setCoord={props.setCoord}
                coord={props.coord}
              />
            </div>
          </CSSTransition>
        )}
        {props.state.jobView === "FIND" && (
          <CSSTransition
            key={2}
            timeout={500}
            classNames="slide"
            in={props.state.jobView === "FIND"}
          >
            <div>
              <Find />
            </div>
          </CSSTransition>
        )}
        {props.state.jobView === "ALL" && (
          <CSSTransition
            key={3}
            timeout={500}
            classNames="slide"
            in={props.state.jobView === "ALL"}
          >
            <div>
              <All />
            </div>
          </CSSTransition>
        )}
        {props.state.jobView === "MESSAGE" && (
          <CSSTransition
            key={4}
            timeout={500}
            classNames="slide"
            in={props.state.jobView === "MESSAGE"}
          >
            <div>
              <Chat messages={props.messages} sendMessage={props.sendMessage} />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
}


export default Jobs;

/* 
users,
jobs,
categories,
offers,
messages,
reviews,
*/
