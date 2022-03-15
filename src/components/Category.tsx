import React from 'react';
import { Link } from 'react-router-dom';

const Category: React.FC<{state: any, setState: React.Dispatch<React.SetStateAction<any>>, categoryData: any}> = ({state, setState, categoryData}) => {
  return (
    <div className="">
      {state && !state.mainCategory && categoryData.map(
          (category: any) => <div className="category" onClick={()=>setState({...state,mainCategory:category})} key={category._id}>{category.name}</div>
        )}
        {state.mainCategory?.subCategories?.map(
          (subCategory: string) => <Link key={subCategory} to="/dashboard/addForm/titleForm"><div className="category" onClick={()=>setState({...state, category:subCategory})} >{subCategory}</div> </Link> )
        }
    </div>
  )
}

export default Category;
