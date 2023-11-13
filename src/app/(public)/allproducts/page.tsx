import * as React from 'react';
import { Metadata } from "next";
import ProductCard from "@/components/card/ProductCard";
import ProductType from "@/types/product";

import "./style.scss";
import { request } from '@/server/request';

export const metadata: Metadata = {
  title: "Mahsulotlar",
  description:
    "Vodiy Parfum | Mahsulotlar",
};


const AllProductsPage = async() => {
  return (
    <section className="all-products">
      <div className="container products__container">
        <ProductCard/>
      </div>
    </section>
  );
}

export default AllProductsPage;
