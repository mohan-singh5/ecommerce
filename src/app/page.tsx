import Image from "next/image";
import Products from "./components/Products";
import Cart from "./components/Cart";
import DataProvider from "./context/DataProvider";

export default function Home() {
  return (
    <>
      <DataProvider>
        <Cart />
      </DataProvider>
    </>
  );
}
