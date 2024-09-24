import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { categories } from "../../utils/categories";
import { Button } from "antd";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "products");
      const q = query(prodCollection, orderBy("createdAt", "desc"), limit(3));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((product) =>
        arr.push({ ...product.data(), id: product.id })
      );
      setProducts([...arr]);
      console.log("arr==>", arr);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif my-3">Latest Items</h1>
          <Button onClick={() => navigate("/products")}>See All</Button>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((data) => (
            <div className="border rounded-md overflow-hidden" key={data.id}>
              <img src={data.img} className="h-60 w-full" />
              <div className="p-2">
                <h1>{data.title}</h1>
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-serif mt-10 mb-2">Item Categories</h1>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((data) => (
            <div className="border rounded-md overflow-hidden" key={data.id}>
              <div className="p-2">
                <h1>{data.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
