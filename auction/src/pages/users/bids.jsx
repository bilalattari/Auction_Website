import { useQuery } from "react-query";
import { auth, getUserBids } from "../../utils/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
dayjs.extend(relativeTime);

function Bid() {
  const userId = auth.currentUser.uid;
  const { data: bidsData, isLoading: isLoadingBids } = useQuery({
    queryKey: ["bids", userId],
    queryFn: () => getUserBids(userId),
  });

  let bidsArray = [];
  if (!bidsData?.empty) {
    bidsData?.forEach((data) =>
      bidsArray.push({ ...data.data(), id: data.id })
    );
  }

  return (
    <div className="p-2 pl-4 ">
      <h1 className="text-3xl">Bid</h1>
      {bidsArray.map((bid) => (
        <div
          key={bid.id}
          className="flex p-3 my-2 border rounded-md justify-between"
        >
          <h1>{bid.bidPrice}</h1>
          <h1>{dayjs().to(bid.createdAt.toDate())}</h1>
          <h1>{bid?.status}</h1>
        </div>
      ))}
    </div>
  );
}

export default Bid;
