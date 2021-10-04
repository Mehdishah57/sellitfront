import React from 'react';
import { Link } from 'react-router-dom';

const Category: React.FC<{state: any, setState: React.Dispatch<React.SetStateAction<any>>, categoryData: any}> = ({state, setState, categoryData}) => {
  return (
    <div className="category">
      {state && !state.mainCategory && categoryData.map(
          (category: any) => <div className="category" onClick={()=>setState({...state,mainCategory:category})} key={category._id}>{category.name}</div>
        )}
        {state.mainCategory?.subCategories?.map(
          (subCategory: string) => <Link to="/dashboard/addForm/titleForm"><div className="category" onClick={()=>setState({...state, subCategory})} key={state.mainCategory._id}>{subCategory}</div> </Link> )
        }
    </div>
  )
}

export default Category;
