import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";

const PRODUCT_DATA = [
	{ id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
	{ id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
	{ id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
	{ id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
	{ id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
	{ id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 49.99, stock: 120, sales: 400 },
	{ id: 7, name: "Running Shoes", category: "Footwear", price: 89.99, stock: 60, sales: 300 },
	{ id: 8, name: "Insulated Water Bottle", category: "Fitness", price: 19.99, stock: 180, sales: 200 },
	{ id: 9, name: "Smartphone Stand", category: "Accessories", price: 25.99, stock: 150, sales: 350 },
	{ id: 10, name: "Gaming Headset", category: "Electronics", price: 79.99, stock: 45, sales: 250 },
	{ id: 11, name: "Fitness Tracker", category: "Electronics", price: 99.99, stock: 90, sales: 600 },
	{ id: 12, name: "Wall Art", category: "Home", price: 39.99, stock: 70, sales: 150 },
	{ id: 13, name: "Portable Charger", category: "Electronics", price: 29.99, stock: 150, sales: 500 },
	{ id: 14, name: "Leather Backpack", category: "Accessories", price: 149.99, stock: 30, sales: 80 },
	{ id: 15, name: "Guitar", category: "Musical Instruments", price: 299.99, stock: 20, sales: 25 },
	{ id: 16, name: "Wireless Mouse", category: "Electronics", price: 29.99, stock: 110, sales: 600 },
	{ id: 17, name: "Desk Organizer", category: "Office", price: 19.99, stock: 140, sales: 200 },
	{ id: 18, name: "Novel Book", category: "Books", price: 15.99, stock: 80, sales: 500 },
	{ id: 19, name: "Chef's Knife", category: "Kitchen", price: 49.99, stock: 50, sales: 150 },
	{ id: 20, name: "Air Purifier", category: "Home", price: 199.99, stock: 25, sales: 40 },
];

const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [priceRangeFilter, setPriceRangeFilter] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 5;

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setCurrentPage(1); 
	};

	const handleCategoryFilterChange = (e) => {
		setCategoryFilter(e.target.value);
		setCurrentPage(1); 
	};

	const handlePriceRangeFilterChange = (e) => {
		setPriceRangeFilter(e.target.value);
		setCurrentPage(1); 
	};

	const filteredProducts = PRODUCT_DATA.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm);
		const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
		const matchesPriceRange =
			priceRangeFilter === "All" ||
			(priceRangeFilter === "Under $50" && product.price < 50) ||
			(priceRangeFilter === "$50 - $100" && product.price >= 50 && product.price <= 100) ||
			(priceRangeFilter === "Over $100" && product.price > 100);

		return matchesSearch && matchesCategory && matchesPriceRange;
	});

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	const nextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const exportToCSV = () => {
		const headers = ["Name", "Category", "Price", "Stock", "Sales"];
		const rows = filteredProducts.map((product) => [
			product.name,
			product.category,
			product.price,
			product.stock,
			product.sales,
		]);

		let csvContent =
			"data:text/csv;charset=utf-8," +
			[headers, ...rows].map((e) => e.join(",")).join("\n");

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "products.csv");
		document.body.appendChild(link);

		link.click();
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6 flex-wrap'>
				<h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
				<div className='flex items-center space-x-4 flex-wrap '>
					<div className='relative mb-1'>
						<input
							type='text'
							placeholder='Search products...'
							className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							onChange={handleSearch}
							value={searchTerm}
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
					<button
						className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onClick={exportToCSV}
					>
						Export to CSV
					</button>
				</div>
			</div>

			{/* Filter Options */}
			<div className='flex items-center mb-4 space-x-4 flex-wrap '>
				<select
					value={categoryFilter}
					onChange={handleCategoryFilterChange}
					className='bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1'
				>
					<option value='All'>All Categories</option>
					<option value='Electronics'>Electronics</option>
					<option value='Accessories'>Accessories</option>
					<option value='Fitness'>Fitness</option>
					<option value='Home'>Home</option>
					<option value='Footwear'>Footwear</option>
					<option value='Musical Instruments'>Musical Instruments</option>
					<option value='Kitchen'>Kitchen</option>
					<option value='Office'>Office</option>
					<option value='Books'>Books</option>
				</select>

				<select
					value={priceRangeFilter}
					onChange={handlePriceRangeFilterChange}
					className='bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					<option value='All'>All Price Ranges</option>
					<option value='Under $50'>Under $50</option>
					<option value='$50 - $100'>$50 - $100</option>
					<option value='Over $100'>Over $100</option>
				</select>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Price
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Stock
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Sales
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{currentProducts.map((product) => (
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									<img
										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
										alt='Product img'
										className='size-10 rounded-full'
									/>
									{product.name}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.category}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									${product.price.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.stock}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.sales}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className='flex justify-between items-center mt-6'>
				<button onClick={prevPage} disabled={currentPage === 1} className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors'>
					Previous
				</button>
				<div className='text-gray-100'>
					Page {currentPage} of {totalPages}
				</div>
				<button onClick={nextPage} disabled={currentPage === totalPages} className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors'>
					Next
				</button>
			</div>
		</motion.div>
	);
};

export default ProductsTable;
