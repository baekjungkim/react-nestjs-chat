// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, faComments,faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import {
  // HomeOutlined,
  // SettingFilled,
  // SmileOutlined,
  // SyncOutlined,
  // LoadingOutlined,
  CommentOutlined,
  PlusCircleOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import './index.css';
import { DEFAULT_IMAGE } from '../../utils/constant';

const Fab = (props: any) => {
  const style = { fontSize: 25, paddingTop: 17, color: '#ccc' };
  const subFab = {fontSize: 23, paddingTop: 12, color: '#ccc'}
  return (
    <div className="fab-container" id="fab-right-bottom">
      <div className="fab fab-icon-holder">
        <PlusCircleOutlined style={ style }/>
      </div>
      <ul className="fab-options">
        <li onClick={ () => props.history.push('make/chat')}>
          <span className="fab-label">AddChatGroup</span>
          <div className="fab-icon-holder">
            <CommentOutlined style={ subFab }/>

            {/* <FontAwesomeIcon icon={faComments} style={{paddingTop: 15}}/> */}
          </div>
        </li>
        <li>
          <span className="fab-label">Feedback</span>
          <div className="fab-icon-holder">
            <QuestionOutlined style={subFab}/>
            {/* <FontAwesomeIcon icon={faCommentAlt} style={{paddingTop: 15}}/> */}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Fab;
