import { useState, useEffect, useMemo } from 'react';

import './App.css';
import { useStoreActions, useStoreState } from 'easy-peasy';
import DrinkCard from './DrinkCard.jsx';
import { Input, Select, Spin } from 'antd';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { fetchDrinks } = useStoreActions((store) => store.drinks);
  const {
    items: drinksData,
    drinked,
    total,
    loading,
  } = useStoreState((store) => store.drinks);

  useEffect(() => {
    fetchDrinks();
  }, []);

  const progress = useMemo(() => {
    return drinked / total || 0;
  }, [drinked, total]);

  const filteredData = useMemo(() => {
    return drinksData
      .filter(
        (group) =>
          selectedCategory === 'all' || group.groupName === selectedCategory
      )
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [drinksData, selectedCategory, searchTerm]);

  const headerView = useMemo(() => {
    return (
      <div className='toolbar'>
        <h1>
          Алко‑карта 🍸{drinked} / {total || 0}
        </h1>

        <div className='controls'>
          <Input
            type='text'
            placeholder='Поиск напитков...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />

          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e)}
            className='category-select'
            options={[
              { value: 'all', label: 'Все категории' },
              ...drinksData.map((group) => ({
                value: group.groupName,
                label: group.groupName,
              })),
            ]}
          />
        </div>

        <div className='progress'>
          <div className='progress-bar'>
            <div
              className='progress-fill'
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className='progress-text'>{(progress * 100).toFixed(2)}%</span>
        </div>
      </div>
    );
  }, [drinked, total, drinksData, searchTerm, selectedCategory, progress]);

  return (
    <Spin spinning={loading}>
      <div className='wrap'>
        {headerView}

        <div className='content'>
          {filteredData.map((drinkGroup) => (
            <div key={drinkGroup.groupName} className='category-section'>
              <h2 className='category-title'>{drinkGroup.groupName}</h2>

              <div className='card-grid'>
                {drinkGroup.items.map((item) => (
                  <DrinkCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className='empty-state'>
            <h3>Ничего не найдено 🍹</h3>
          </div>
        )}
      </div>
    </Spin>
  );
}

export default App;
