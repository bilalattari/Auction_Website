import { useQuery } from "react-query";
import { auth, getUserBids, getUserProducts } from "../../utils/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import { Image } from "antd";
dayjs.extend(relativeTime);

function UserProducts() {
  const userId = auth.currentUser.uid;
  const { data: productData, isLoading: isLoadingBids } = useQuery({
    queryKey: ["products", userId],
    queryFn: () => getUserProducts(userId),
  });

  let productArray = [];
  if (!productData?.empty) {
    productData?.forEach((data) =>
      productArray.push({ ...data.data(), id: data.id })
    );
  }

  return (
    <div className="p-2 pl-4 ">
      <h1 className="text-3xl">Products</h1>
      {productArray.map((product) => (
        <div
          key={product.id}
          className="flex p-3 my-2 border rounded-md"
        >
          <Image src={product.img} height={100} width={100} />
          <div className="pl-2">
            <h1 className="font-semibold text-2xl">{product.title}</h1>
            <h1 className="font-normal text-md">{product.desc}</h1>
            <h1 className="font-light text-sm">{dayjs().to(product.createdAt.toDate())}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserProducts;
