import React, { useState } from "react";
import { Button, Input, Modal, message } from "antd";
import { auth, db } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const BidModal = ({ isModalOpen, onClose, title, price, productId, onBid }) => {
  const [bidPrice, setPrice] = useState(price);
  const [loading, setLoading] = useState(false);
  const handleOnBid = async () => {
    try {
      setLoading(true);
      const bidObj = {
        productId,
        userId: auth.currentUser.uid,
        bidPrice,
        status: "pending",
        createdAt: serverTimestamp(),
      };
      const bidCollectionRef = collection(db, "bids");
      await addDoc(bidCollectionRef, bidObj);
      message.success("Bid added successfully")
      setLoading(false);
      onClose();
    } catch (err) {
      message.error("Something went wrong..");
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Bid Modal"
      footer={false}
      onCancel={onClose}
      open={isModalOpen}
    >
      <div className="flex my-4 justify-between">
        <div>{title}</div>
        <div>Min Price : {price}</div>
      </div>
      <Input
        placeholder="Bid Price"
        value={bidPrice}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
      />
      <Button
        onClick={handleOnBid}
        loading={loading}
        disabled={bidPrice <= price}
        className="flex mx-auto my-3"
      >
        Bid on this Product
      </Button>
    </Modal>
  );
};
export default BidModal;
