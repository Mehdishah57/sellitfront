import React, { useState, useLayoutEffect, useRef } from "react";
import "../styles/productadditionals.scss";
import fetchCountriesData from "./../services/fetchCountries";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  localState: any;
  setLocalState: React.Dispatch<any>;
  submitForm: any;
}

interface ImageProps {
  name: string;
}

const ProductAddtionals: React.FC<Props> = ({ localState, setLocalState, submitForm }) => {
  const [price, setPrice] = useState<number | string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [imageState, setImageState] = useState<any>({});
  const [tempImgDisplay, setTempImgDisplay] = useState<any>({});
  const [countries, setCountries] = useState<any[]>([]);
  const fetchCountries = useRef<() => void>(() => {});

  const navigate = useNavigate();

  fetchCountries.current = async () => {
    const { data, error } = await fetchCountriesData();
    if (error) return console.log(error);
    if (data) setCountries(data);
  };

  useLayoutEffect(() => {
    fetchCountries.current();
  }, []);

  const CityList = () => {
    const ctr = countries.find((item) => item.name === country);
    return ctr.cities.map((item: any, index: number) => (
      <option key={index}>{item.city}</option>
    ));
    
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.currentTarget.files) return;
    let imst = {...imageState,
      [e.currentTarget.name]: e.currentTarget.files[0],}
    setImageState({
      ...imageState,
      [e.currentTarget.name]: e.currentTarget.files[0],
    });
    setTempImgDisplay({
      ...tempImgDisplay,
      [e.currentTarget.name]: URL.createObjectURL(e.currentTarget.files[0]),
    });
    setLocalState({...localState, picture: imst})
  };

  const ImgInput: React.FC<ImageProps> = ({ name }) => (
    <div className="single-field-wrapper">
      {imageState[name] ? (
        <img width="100%" src={tempImgDisplay[name]} alt="" />
      ) : (
        <i className="fa fa-camera" aria-hidden="true"></i>
      )}
      <input name={name} type="file" onChange={handleImageChange} />
    </div>
  );

  const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPrice(e.currentTarget.value);
    setLocalState({...localState, price: e.currentTarget.value})

  };

  const handleCountryChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setCountry(e.currentTarget.value);
    setLocalState({...localState, country: e.currentTarget.value})
  };

  const handleCityChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCity(e.currentTarget.value);
    setLocalState({...localState, city: e.currentTarget.value})

  };

  const handleFinish = () => {
    // setLocalState({...localState,price,city,country,picture:imageState})
    submitForm().catch((err: any)=> console.log(err));
  }

  return (
    <div className="productaddtionals-wrapper">
      <div className="priceinput-wrapper">
        <input
          id="price"
          type="text"
          value={price}
          onChange={handlePriceChange}
        />
        <label
          style={
            price
              ? {
                  fontSize: "14px",
                  padding: "5px",
                  fontWeight: "bold",
                  color: "#222222",
                  transform: "translateY(-25px)",
                }
              : {}
          }
          htmlFor="price"
        >
          Price
        </label>
      </div>
      <div className="select-wrapper">
        <select onChange={handleCountryChange}>
          <option value="">Select your Country</option>
          {countries.map((item) => (
            <option key={item._id}>{item.name}</option>
          ))}
        </select>
        {country ? (
          <select value={city} onChange={handleCityChange}>
            <option value="">Select your City</option>
            <CityList />
          </select>
        ) : null}
      </div>
      <div className="imageinput-wrapper">
        <ImgInput name="image1" />
        {imageState.image1 && <ImgInput name="image2" />}
        {imageState.image2 && <ImgInput name="image3" />}
        {imageState.image3 && <ImgInput name="image4" />}
        {imageState.image4 && <ImgInput name="image5" />}
        {imageState.image5 && <ImgInput name="image6" />}
      </div>
      <div className="button-wrapper">
        <Link to="../description">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          Back
        </Link>
        <button onClick={handleFinish}>Submit</button>
      </div>
    </div>
  );
};

export default ProductAddtionals;
