import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { categories } from "../../utils/categories";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
dayjs.extend(relativeTime);

function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "products");
      const q = query(prodCollection, orderBy("createdAt", "desc"));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((product) =>
        arr.push({ ...product.data(), id: product.id })
      );
      setProducts([...arr]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif">All Items</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {products.map((data) => (
            <Link to={`/products/${data.id}`} key={data.id}>
              <div className="border rounded-md overflow-hidden" >
                <img src={data.img} className="h-60 w-full" />
                <div className="p-2">
                  <h1>{data.title}</h1>
                  <h1 className="font-bold mt-2">Sale Price :{data.price}</h1>
                </div>
                <div className="p-2">
                  <h1>{dayjs().to(data.createdAt.toDate())}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
