import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullParfum: React.FC = () => {
  const [parfum, setParfum] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchParfums() {

      try {
        const { data } = await axios.get('https://6384b2983fa7acb14ffdb723.mockapi.io/items/' + id);
        setParfum(data);

      } catch (error) {
        alert('Помилка при отриманні!');
        navigate('/');
      }
    }
    fetchParfums();

  }, []);

  if (!parfum) {
    return <>ЗАВАНТАЖЕННЯ</>;
  }

  return (
    <div className='container container-full'>
      <img src={parfum.imageUrl} />
      <h2 className='parfum-block__title-full'>{parfum.title}</h2>
      <h4 className='parfum-block__price'>{parfum.price} грн.</h4>
    </div>
  )
}

export default FullParfum;