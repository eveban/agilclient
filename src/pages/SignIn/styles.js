import styled from 'styled-components';
import { darken } from 'polished';

export const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 430px;
  background-color: #ffffff;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2),
    0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 6px 10px 0 rgba(0, 0, 0, 0.14);
  -moz-box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2),
    0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 6px 10px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
    0 6px 10px 0 rgba(0, 0, 0, 0.14);
`;

export const Container = styled.div`
  width: 330px;
  padding: 0px;
  text-align: center;
  img {
    width: 250px;
    opacity: 80%;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: rgba(0, 0, 0, 0.8);
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #333;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
      -webkit-box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2),
        0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 6px 10px 0 rgba(0, 0, 0, 0.14);
      -moz-box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2),
        0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 6px 10px 0 rgba(0, 0, 0, 0.14);
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2),
        0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 6px 10px 0 rgba(0, 0, 0, 0.14);
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
export const Card = styled.div`
  border-radius: 4px;
  width: 100%;
  max-width: 384px;
  max-height: 600px;
`;
