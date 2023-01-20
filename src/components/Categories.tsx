import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {

  const categories = [
    'Всі',
    'Водяні',
    'Мускусні',
    'Солодкі',
    'Східні',
    'Свіжі',
  ]

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, index) => <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {categoryName}
          </li>
          )
        }
      </ul>
    </div>
  )
});

export default Categories;