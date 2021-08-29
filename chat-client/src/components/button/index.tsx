import './index.css';

export interface Props {
  style: any;
  onClick: any;
}

const Button = (props: Props) => {
  return (
    <div className="wrap" id="btn">
      <button
        className="button"
        onClick={props.onClick}
        style={ props.style }
      >
        Submit
      </button>
    </div>
  );
};

export default Button;
