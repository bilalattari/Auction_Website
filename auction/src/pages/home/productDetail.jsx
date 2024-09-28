import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { db } from "../../utils/firebase";
import { useQuery } from "react-query";
import { Button, Image } from "antd";
import BidModal from "../../components/bidModal";
import { useState } from "react";

const getProductInfo = async (id) => {
  const docRef = doc(db, "products", id);
  const prouductInfo = getDoc(docRef);
  return await prouductInfo;
};

function ProductDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductInfo(id),
  });

  const handleOnBid = () => {
    setIsModalOpen(true);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (!isLoading && !data.exists()) return <h1>Product Not Found</h1>;

  const { category, img, desc, price, title } = data?.data();

  return (
    <div className="flex justify-center my-4 rounded-md overflow-hidden items-center flex-col">
      <BidModal
        title={title}
        price={price}
        productId={id}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Image preview={false} src={img} height={300} width={300} />
      <h1>{title}</h1>
      <h1>{price}</h1>
      <Button onClick={handleOnBid}>Bid on this Product</Button>
    </div>
  );
}

export default ProductDetail;
