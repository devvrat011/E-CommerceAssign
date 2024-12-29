import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, Alert, Spinner } from 'flowbite-react';
import { productFetchStart, productFetchSuccess, productFetchFailure } from '../redux/product/productSlice';
import Card from './card';
export default function ProductList() {
  const dispatch = useDispatch();
  const { loading, products, error: errorMessage } = useSelector((state) => state.product);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(productFetchStart());
        const res = await fetch(`http://localhost:8000/api/products`);
        const data = await res.json();
        if (res.ok) {
          dispatch(productFetchSuccess(data.products));
          setShowMore(data.products.length >= 12);
        }
      } catch (error) {
        dispatch(productFetchFailure(error.message));
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(productFetchStart());
      let url = 'http://localhost:8000/api/products';
      const queryParams = [];
      if (category !== "all") queryParams.push(`category=${encodeURIComponent(category)}`);
      if (priceRange !== "all") queryParams.push(`price=${encodeURIComponent(priceRange)}`);
      if (queryParams.length) url += '?' + queryParams.join('&');
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        dispatch(productFetchSuccess(data.products));
        setShowMore(data.products.length >= 12);
      }
    } catch (error) {
      dispatch(productFetchFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mb-4">
        <div className="flex space-x-4">
        <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border-2 border-gray-200 shadow-xl"
                required
              >
                <option value="">Select Category</option>
                                <option value="Living Room">Living Room</option>
                                <option value="Bedroom">Bedroom</option>
                                <option value="Kitchen">Kitchen</option>
              </select>
          <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="Price">
            <option value="all">All Price</option>
            <option value="under-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
          </Select>
          <Button type='submit' onClick={handleSubmit} outline gradientDuoTone='purpleToPink'>
              Apply Filters
          </Button>
        </div>
        <div className="flex space-x-2">
          <div onClick={() => {/* sorting logic here */}}>Sort by ↓</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl">
        {loading && (
          <div className="flex justify-center items-center col-span-full">
            <Spinner size="xl" />
          </div>
        )}
        {!loading && products.length === 0 && (
          <div className="text-gray-500 text-center col-span-full">
            No products found.
          </div>
        )}
        {!loading && products.map((product) => (
          <Card card={product}/>
        ))}
      </div>
      {showMore && (
        <button
          className="text-blue-500 text-sm mt-6 hover:underline"
        >
          Show More
        </button>
      )}
      
      {errorMessage && <Alert color="failure" className="mt-4">{errorMessage}</Alert>}
    </div>
  );
}
