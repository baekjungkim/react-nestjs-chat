import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faComments,faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import './index.css';

const Fab = (props: any) => {
  return (
    <div className="fab-container" id="fab-right-bottom">
      <div className="fab fab-icon-holder">
        <FontAwesomeIcon icon={faCoffee} style={{paddingTop: 20}}/>
      </div>
      <ul className="fab-options">
        <li onClick={ () => props.history.push('make/chat')}>
          <span className="fab-label">AddChatGroup</span>
          <div className="fab-icon-holder">
            <FontAwesomeIcon icon={faComments} style={{paddingTop: 15}}/>
          </div>
        </li>
        <li>
          <span className="fab-label">Feedback</span>
          <div className="fab-icon-holder">
            <FontAwesomeIcon icon={faCommentAlt} style={{paddingTop: 15}}/>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Fab;
