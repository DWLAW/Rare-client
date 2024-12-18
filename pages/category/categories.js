import { useEffect, useState } from 'react';
import { getCategories } from '../../api/categoryData';
import CategoryCard from '../../components/CategoryCard';
import CategoryForm from '../../components/Forms/CategoryForm';

export default function Category() {
  const [categories, setCategory] = useState([]);

  const getTheCategories = () => {
    getCategories().then(setCategory);
  };

  useEffect(() => {
    getTheCategories();
  }, []);

  return (
    <>
      <div>
        <div>
          <h1>Categories</h1>
          {categories.map((category) => (
            <CategoryCard key={category.id} categoryObj={category} onUpdate={getTheCategories} />
          ))}
        </div>

        <h2 style={{ margin: '15px' }}>Create a Category</h2>
        <CategoryForm onSubmit={getTheCategories} />
      </div>

    </>
  );
}
