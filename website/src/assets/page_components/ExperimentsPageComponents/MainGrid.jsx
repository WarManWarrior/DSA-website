import React from 'react';
import Card from './Card'; // Adjust the import path as necessary

const cardData = [
  {
    image: 'https://via.placeholder.com/250x150?text=Image+1',
    title: 'Card Title 1',
    subtitle: 'Subtitle for Card 1',
    description: 'Description for Card number one.'
  },
  
  {
    image: 'https://via.placeholder.com/250x150?text=Image+2',
    title: 'Card Title 2',
    subtitle: 'Subtitle for Card 2',
    description: 'Description for Card number two.'
  },

  {
    image: 'https://via.placeholder.com/250x150?text=Image+3',
    title: 'Card Title 3',
    subtitle: 'Subtitle for Card 3',
    description: 'Description for Card number three.'
  },

   {
     image: 'https://via.placeholder.com/250x150?text=Image+4',
     title: 'Card Title 4',
     subtitle: 'Subtitle for Card 4',
     description: 'Description for Card number four.'
   },

   {
     image: 'https://via.placeholder.com/250x150?text=Image+5',
     title: 'Card Title 5',
     subtitle: 'Subtitle for Card 5',
     description: 'Description for Card number five.'
   },

   {
     image: 'https://via.placeholder.com/250x150?text=Image+6',
     title: 'Card Title 6',
     subtitle: 'Subtitle for Card 6',
     description: 'Description for Card number six.'
   },
];

const CardList = () => {
 return (
   <div style={{ display:'flex', flexWrap:'wrap', gap:'20px' }}>
     {cardData.map((data, index) => (
       <Card 
         key={index}
         image={data.image}
         title={data.title}
         subtitle={data.subtitle}
         description={data.description}
       />
     ))}
   </div>
 );
}

export default CardList;

