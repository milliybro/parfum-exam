"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { InputBase} from "@mui/material";
import Paper from "@mui/material/Paper";
import Pagination from '@mui/material/Pagination';

import FavoriteBorderIconOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import useCart from "@/store/cart";
import useFav from "@/store/fav";
import { request } from "@/server/request";


import "@/general-styles/product-card.scss";
import ProductType from "@/types/product";
import { LIMIT } from "@/constants";

interface ParamTypes {
  limit: number,
  search: string,
  page: number,
  category?: string,
}

const ProductCard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { addToCart } = useCart();
  const {addToFav, cart} = useFav();

  useEffect(() => {
    const getCategories = async() => {
      const {data: categories} = await request.get("category");
      setCategories(categories)
    }
    getCategories();

    const getProducts = async() => {
      const params: ParamTypes = {
        page,
        limit: LIMIT,
        search,
      };
      if (category) {
        params.category = category;
      } 
      const {data: {products, total}} = await request.get("product", {params});
      setProducts(products)
      setTotal(total);
    }
    getProducts();
  }, [setCategories, setProducts, page, search, category])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  }

  const sortByCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setPage(1);
  };
  

  

  const controlPages = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  }

  const isProductInFav = (productId: string) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };
  


  return (
    <div>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        style={{gap: "10px", position: "sticky"}}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Mahsulotlar izlash"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearch(event)}
          inputProps={{ "aria-label": "search products" }}
        />
        <select onChange={(event) => sortByCategory(event)} className="category-sort" style={{ height: "100%", width: "12%" }}>
          <option value="" style={{ height: "100%" }}>
            Barcha mahsulotlar
          </option>
          {categories?.map((category: { _id: string; name: string }) => (
            <option
              key={category?._id}
              style={{ height: "100%" }}
              value={category?._id}
            >
              {category?.name}
            </option>
          ))}
        </select>
      </Paper>
      <div className="allproducts__row">
        {products?.map((product: ProductType) => (
          <div key={product?._id} className="allproducts__card">
            <div className="product__img">
              <Image
                src={product?.image.url}
                alt={product?.title || "Product"}
                fill
                objectFit="cover"
              />
              <button onClick={() => addToFav(product?._id,
                    product?.image.url,
                    product?.title,
                    product?.description,
                    product?.price)} className="favourite__btn">
                <FavoriteBorderIconOutlined />
              </button>
              <div className="category__info">{product?.category.name}</div>
            </div>
            <Link
              href={`/allproducts/${product?._id}`}
              className="allproducts__content"
            >
              <h4>{product?.title || "Nomsiz mahsulot"}</h4>
              <span>{product?.price || "Narxlanmagan"} so`m</span>
            </Link>
            <div className="button__wrapper">
              <button
                onClick={() =>
                  addToCart(
                    product?._id,
                    product?.image.url,
                    product?.title,
                    product?.description,
                    product?.price
                  )
                }
                className="product__btn"
              >
                Savatga qo`shish
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
       {(total / LIMIT) > 1 ? <Pagination
          count={Math.ceil(total / LIMIT)}
          page={page}
          onChange={(event, value) => controlPages(event, value)}
          boundaryCount={2}
        /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
