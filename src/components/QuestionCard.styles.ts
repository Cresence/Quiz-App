import styled from "styled-components";

export const Wrapper = styled.div`
    max-wdith: 1100pm;
    background: #ebfeff;
    border-radius: 10px;
    border: 2px splid #0085a3;
    padding: 20px;
    box-shadow: 0px 5px 10px rbga(0, 0, 0, 0.25);
    text-align: center;

    p {
        font-size: 1rem
    }
`
type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
}


export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;

    hover {
        opacity: 0.8;
    }

    button {
        cursor: pointer;
        user-select: none;
        font-size: 0.8rem;
        width: 100%;
        height: 40px;
        margin: 5px 0;
        background: ${({ correct, userClicked }) => {
            correct
                ? 'linear-gradient(90deg, #56ffar, #59bc86)'
                : !correct && userClicked
                ? 'linear-gradient(90deg, #ff5656, #c16868)'
                : 'linear-gradient(90deg, #56ccff, #6eafb4)'}
        }
    }
`