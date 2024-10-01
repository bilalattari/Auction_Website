import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";
import {
  auth,
  db,
  getProductBids,
  getProductInfo,
  updateBidStatus,
} from "../../utils/firebase";
import { useQuery } from "react-query";
import { Button, Image, message } from "antd";
import BidModal from "../../components/bidModal";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
dayjs.extend(relativeTime);

function ProductDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductInfo(id),
  });

  const { data: bidsData, isLoading: isLoadingBids } = useQuery({
    queryKey: ["bids", id],
    queryFn: () => getProductBids(id),
  });

  const handleOnBid = () => {
    setIsModalOpen(true);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (!isLoading && !data.exists()) return <h1>Product Not Found</h1>;

  const { category, img, desc, price, title, createdBy } = data?.data();

  let bidsArray = [];
  if (!bidsData?.empty) {
    bidsData?.forEach((data) =>
      bidsArray.push({ ...data.data(), id: data.id })
    );
  }

  const isOwner = createdBy == auth.currentUser.uid;

  // console.log("isOwner=>", isOwner);

  const handleOnClickAcceptReject = async (bidId, status) => {
    try {
      const updated = await updateBidStatus(bidId, status);
      console.log("updated=>", updated);
      message.success("Bid Updated Successfully");
      refetch();
    } catch (err) {
      console.log(err);
      message.error(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen my-4 rounded-md overflow-hidden">
      <BidModal
        title={title}
        price={price}
        productId={id}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="w-1/2 flex flex-col  items-center">
        <Image preview={false} src={img} height={300} width={300} />
        <h1>{title}</h1>
        <h1>{price}</h1>
        <Button disabled={isOwner} onClick={handleOnBid}>
          Bid on this Product
        </Button>
      </div>

      <div className="w-1/2 flex flex-col mr-3">
        <h1 className="text-3xl font-bold text-center">Bids</h1>
        {bidsArray.map((bid) => (
          <div
            key={bid.id}
            className="flex p-3 my-2 border rounded-md justify-between"
          >
            <h1>{bid.bidPrice}</h1>
            <h1>{dayjs().to(bid.createdAt.toDate())}</h1>
            {isOwner && bid?.status == "pending" ? (
              <div>
                <Button
                  onClick={() => handleOnClickAcceptReject(bid.id, "accept")}
                  type="primary"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleOnClickAcceptReject(bid.id, "reject")}
                  type="danger"
                >
                  Reject
                </Button>
              </div>
            ) : (
              <h1>{bid?.status}</h1>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;
