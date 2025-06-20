import styled from "styled-components";

export const ContainerPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 5rem;
  background: #fafafa;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 5rem 10px 0 5px;
  }
`;

export const ContainerLogin = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2.5rem;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerRegister = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 1rem;
`;

export const WrapperLogin = styled.div`
  width: 400px;
  height: 600px;
  background-color: f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    margin: 15px !important;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WrapperVerticalLogin = styled.div`
  width: 1400px;
  height: 800px;
  background-color: f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: #ebebeb;
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.5);
`;

export const ParagraphThin = styled.p`
  font-size: 12px !important;
  color: rgb(131, 131, 131) !important;
`;

export const ContainerReSendEmail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-radius: 15px 0 0 15px;
  padding: 25px 75px;
  background: #2c2c2c;
  margin: 0 0 50px 0;

  @media (max-width: 768px) {
    margin: 0 0 50px 5px;
    padding: 25px 55px;
    flex-direction: column;
  }
`;

interface ContentHeaderProps {
  align?: string;
}

export const ContentHeader = styled.div<ContentHeaderProps>`
  display: flex;
  align-items: ${(props) => props.align || "start"};
  flex-direction: column;
  width: 100%;
  border-radius: 15px 0 0 15px;
`;

export const ContentHeaderImg = styled.div<ContentHeaderProps>`
  display: flex;
  align-items: ${(props) => props.align || "start"};
  flex-direction: column;
  width: 100%;
  border-radius: 15px 0 0 15px;

  @media (max-width: 1110px) {
    align-items: center;
  }
`;

export const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  span {
    font-size: 1.5rem;
    color: #2c2c2c;
  }
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const SubTitle = styled.div`
  font-size: 1rem;
  color: white;
  font-weight: 400;
  line-height: 2;
  margin: 25px 0;
`;

export const CheckboxContainer = styled.label`
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

export const StyledCheckbox = styled.span`
  width: 20px;
  height: 20px;
  background-color: white;
  border: 2px solid #2c2c2c;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${CheckboxContainer}:hover & {
    border-color: #1a1a1a;
  }

  ${HiddenCheckbox}:checked + & {
    background-color: #2c2c2c;
    border-color: #2c2c2c;
  }

  ${HiddenCheckbox}:checked + &::after {
    content: "x";
    position: absolute;
    color: white;
    font-size: 16px;
  }
`;
