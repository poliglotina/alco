import React, { useState } from 'react';

import { useStoreActions } from 'easy-peasy';
import CardModal from './ModalContent.jsx';
import { Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const DrinkCard = ({ item }) => {
  const { tryDrink } = useStoreActions((store) => store.drinks);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className={`cell ${item.tried ? 'tried' : ''}`}
        onClick={() => setOpenModal(true)}
      >
        <div className='drink-image'>
          {item.imgPath ? (
            <img src={item.imgPath} alt={item.name} />
          ) : (
            <div className='drink-placeholder'>
              {item.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className='drink-info'>
          <div className='drink-title'>{item.name}</div>

          <div className='drink-meta'>
            {item.tried && (
              <>
                <StarOutlined />
                {item.rate + '/' + 10}
              </>
            )}
            {!item.tried && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(
                    `https://google.com/search?q=Напиток ${item.name}`,
                    '_blank'
                  );
                }}
              >
                Найти в гугле
              </Button>
            )}
          </div>
        </div>
      </div>
      {openModal && (
        <CardModal
          item={item}
          handleClose={() => {
            setOpenModal(false);
          }}
          handleSave={(data) => {
            tryDrink({
              ...data,
              id: item.id,
              tried_date: new Date(),
              tried: true,
            });
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
};

export default DrinkCard;
