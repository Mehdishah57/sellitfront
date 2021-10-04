import React, { useEffect, useState, useRef } from 'react';
import Card from './../components/Card';
import getHomeAds from './../services/getHomeAds';
import "../styles/home.scss";
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [pageSize] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const fetchProducts = useRef<any>(null);

  const history = useHistory();

  fetchProducts.current = async() => {
    const { data, error } = await getHomeAds(pageSize,pageNumber);
    if(data) setProducts(data);
    if(error) console.log("Error while getting Products from server")
  }

  useEffect(()=>{
    fetchProducts.current();
  },[pageNumber]);

  const nextPage = () => {
    if(products && products.length === pageSize)
      setPageNumber(prevNo => prevNo + 1);
  }

  const prevPage = () =>  setPageNumber(prevNo => prevNo>1?prevNo-1:prevNo);

  const handleClick = (_id: string) => history.push(`/dashboard/productInfo/${_id}`);

  const handleSearch = () => {
    if(!search) return;
  }

  return (
    <div className="home-container">
      <main>
        <div className="search-wrapper">
          <input spellCheck={false} value={search} onChange={e => setSearch(e.currentTarget.value)} type="text" placeholder="Search" />
          <button onClick={handleSearch}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <div className="categories-wrapper">
        </div>
        <div className="products-wrapper">
          {
            products && products.length>0?
            products.map( (item: any)=> <Card key={item._id} item={item} onClick={(e)=>handleClick(item._id)} />)
            : null
          }
        </div>
        <div className="page-change">
          <span onClick={prevPage} className="prev-page">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </span>
          <span className="current-page">{pageNumber}</span>
          <span onClick={nextPage} className="next-page">
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </span>
        </div>
      </main>
    </div>
  )
}

export default Home;
