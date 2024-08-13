import React, { useState, useEffect } from 'react';
import mockData from '../mockData';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

const ProductTable = () => {
  const [data, setData] = useState(mockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setData(
      mockData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>SKU</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Promise Date</th>
            <th>Customers</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.sku}</td>
              <td>{item.date}</td>
              <td>{item.quantity}</td>
              <td>{item.promiseDate}</td>
              <td>{item.customer}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ProductTable;
