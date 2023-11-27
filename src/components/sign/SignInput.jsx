import styled from "styled-components";
import PropTypes from "prop-types";

SignInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  forwardedRef: PropTypes,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default function SignInput(props) {
  return (
    <>
      <Input
        type={props.type}
        name={props.name}
        ref={props.forwardedRef}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </>
  );
}

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  font-size: 16px;
`;
