import React from 'react';
import styled from 'styled-components';

const Card = ({ image, title, subtitle, description }) => {
  return (
    <StyledWrapper>
      <article className="card">
        <img src={image} alt={title} className="card_image" />
        <div className="card_content">
          <span className="card_title">{title}</span>
          <span className="card_subtitle">{subtitle}</span>
          <p className="card_description">{description}</p>
        </div>
      </article>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 250px;
    height: 250px;
    color: #2e2d31;
    background: #131313;
    overflow: hidden;
    border-radius: 20px;
  }

  .temporary_text {
    font-weight: bold;
    font-size: 24px;
    padding: 6px 12px;
    color: #f8f8f8;
  }

  .card_title {
    font-weight: bold;
  }

  .card_content {
    position: absolute;
    left: 0;
    bottom: 0;
      /* edit the width to fit card */
    width: 100%;
    padding: 20px;
    background: #f2f2f2;
    border-top-left-radius: 20px;
      /* edit here to change the height of the content box */
    transform: translateY(150px);
    transition: transform .25s;
  }

  .card_content::before {
    content: '';
    position: absolute;
    top: -47px;
    right: -45px;
    width: 100px;
    height: 100px;
    transform: rotate(-175deg);
    border-radius: 50%;
    box-shadow: inset 48px 48px #f2f2f2;
  }

  .card_title {
    color: #131313;
    line-height: 15px;
  }

  .card_subtitle {
    display: block;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .card_description {
    font-size: 14px;
    opacity: 0;
    transition: opacity .5s;
  }

  .card:hover .card_content {
    transform: translateY(0);
  }

  .card:hover .card_description {
    opacity: 1;
    transition-delay: .25s;
  }`;

export default Card;

