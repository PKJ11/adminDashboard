import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const leadData = [
	{ id: 1, name: "John Doe", email: "john@example.com", source: "Website", status: "New", salesRep: "Alice" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", source: "Referral", status: "Contacted", salesRep: "Bob" },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", source: "Social Media", status: "Qualified", salesRep: "Charlie" },
	{ id: 4, name: "Alice Brown", email: "alice@example.com", source: "Website", status: "In Progress", salesRep: "David" },
	{ id: 5, name: "Charlie Wilson", email: "charlie@example.com", source: "Ad Campaign", status: "Closed", salesRep: "Eve" },
	{ id: 6, name: "Emily Davis", email: "emily@example.com", source: "Webinar", status: "New", salesRep: "Frank" },
	{ id: 7, name: "Michael Clark", email: "michael@example.com", source: "Cold Call", status: "Contacted", salesRep: "Grace" },
	{ id: 8, name: "Sarah White", email: "sarah@example.com", source: "Email Campaign", status: "Qualified", salesRep: "Hank" },
	{ id: 9, name: "James Harris", email: "james@example.com", source: "Website", status: "In Progress", salesRep: "Ivy" },
	{ id: 10, name: "Sophia Miller", email: "sophia@example.com", source: "Referral", status: "Closed", salesRep: "Jack" },
	{ id: 11, name: "Oliver King", email: "oliver@example.com", source: "Social Media", status: "New", salesRep: "Kate" },
	{ id: 12, name: "Ava Scott", email: "ava@example.com", source: "Webinar", status: "Contacted", salesRep: "Leo" },
	{ id: 13, name: "William Adams", email: "william@example.com", source: "Cold Call", status: "Qualified", salesRep: "Mia" },
	{ id: 14, name: "Isabella Lee", email: "isabella@example.com", source: "Email Campaign", status: "In Progress", salesRep: "Nick" },
	{ id: 15, name: "Lucas Green", email: "lucas@example.com", source: "Ad Campaign", status: "Closed", salesRep: "Olivia" },
	{ id: 16, name: "Charlotte Evans", email: "charlotte@example.com", source: "Website", status: "New", salesRep: "Paul" },
	{ id: 17, name: "Liam Mitchell", email: "liam@example.com", source: "Referral", status: "Contacted", salesRep: "Quinn" },
	{ id: 18, name: "Mason Roberts", email: "mason@example.com", source: "Social Media", status: "Qualified", salesRep: "Rachel" },
	{ id: 19, name: "Mia Thomas", email: "mia@example.com", source: "Webinar", status: "In Progress", salesRep: "Sam" },
	{ id: 20, name: "Amelia Walker", email: "amelia@example.com", source: "Cold Call", status: "Closed", salesRep: "Tom" }
];

const LeadManagement = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [statusFilter, setStatusFilter] = useState("");
	const [sourceFilter, setSourceFilter] = useState("");
	const [repFilter, setRepFilter] = useState("");
	const leadsPerPage = 5;

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setCurrentPage(1); // Reset to the first page on search
	};

	const handleStatusFilterChange = (e) => {
		setStatusFilter(e.target.value);
		setCurrentPage(1); // Reset to the first page on filter change
	};

	const handleSourceFilterChange = (e) => {
		setSourceFilter(e.target.value);
		setCurrentPage(1); // Reset to the first page on filter change
	};

	const handleRepFilterChange = (e) => {
		setRepFilter(e.target.value);
		setCurrentPage(1); // Reset to the first page on filter change
	};

	// Filter leads based on search term and additional filters
	const filteredLeads = leadData.filter((lead) => {
		const matchesSearchTerm =
			lead.name.toLowerCase().includes(searchTerm) ||
			lead.email.toLowerCase().includes(searchTerm) ||
			lead.source.toLowerCase().includes(searchTerm);
		
		const matchesStatus = statusFilter ? lead.status === statusFilter : true;
		const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
		const matchesRep = repFilter ? lead.salesRep === repFilter : true;

		return matchesSearchTerm && matchesStatus && matchesSource && matchesRep;
	});

	// Get current leads based on pagination
	const indexOfLastLead = currentPage * leadsPerPage;
	const indexOfFirstLead = indexOfLastLead - leadsPerPage;
	const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

	const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

	const nextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const exportToCSV = () => {
		const csvData = filteredLeads.map((lead) => ({
			Name: lead.name,
			Email: lead.email,
			Source: lead.source,
			Status: lead.status,
			"Sales Rep": lead.salesRep,
		}));

		const csvRows = [
			Object.keys(csvData[0]).join(","), // headers
			...csvData.map((row) => Object.values(row).join(",")), // data rows
		].join("\n");

		const blob = new Blob([csvRows], { type: "text/csv" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "leads.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Get unique statuses, sources, and sales reps for filtering options
	const uniqueStatuses = [...new Set(leadData.map((lead) => lead.status))];
	const uniqueSources = [...new Set(leadData.map((lead) => lead.source))];
	const uniqueReps = [...new Set(leadData.map((lead) => lead.salesRep))];

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6 flex-wrap'>
				<h2 className='text-xl font-semibold text-gray-100 mb-2'>Lead Management</h2>
				<div className='flex space-x-4 flex-wrap'>
					<div className='relative mb-1'>
						<input
							type='text'
							placeholder='Search leads...'
							className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={searchTerm}
							onChange={handleSearch}
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
					<button
						onClick={exportToCSV}
						className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors'
					>
						Export to CSV
					</button>
				</div>
			</div>

			{/* Filter Options */}
			<div className='flex space-x-4 mb-4 flex-wrap'>
				<select value={statusFilter} onChange={handleStatusFilterChange} className='bg-gray-700 text-white rounded-lg px-4 py-2 mb-1 sm:ml-20'>
					<option value=''>All Statuses</option>
					{uniqueStatuses.map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>

				<select value={sourceFilter} onChange={handleSourceFilterChange} className='bg-gray-700 text-white rounded-lg px-4 py-2 mb-1'>
					<option value=''>All Sources</option>
					{uniqueSources.map((source) => (
						<option key={source} value={source}>
							{source}
						</option>
					))}
				</select>

				<select value={repFilter} onChange={handleRepFilterChange} className='bg-gray-700 text-white rounded-lg px-4 py-2'>
					<option value=''>All Sales Reps</option>
					{uniqueReps.map((rep) => (
						<option key={rep} value={rep}>
							{rep}
						</option>
					))}
				</select>
			</div>

			{/* Leads Table */}
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-600'>
					<thead className='bg-gray-700'>
						<tr>
							<th className='px-4 py-2 text-left text-gray-300'>Name</th>
							<th className='px-4 py-2 text-left text-gray-300'>Email</th>
							<th className='px-4 py-2 text-left text-gray-300'>Source</th>
							<th className='px-4 py-2 text-left text-gray-300'>Status</th>
							<th className='px-4 py-2 text-left text-gray-300'>Sales Rep</th>
						</tr>
					</thead>
					<tbody className='bg-gray-800 divide-y divide-gray-600'>
						{currentLeads.map((lead) => (
							<tr key={lead.id}>
								<td className='px-4 py-2 text-gray-100'>{lead.name}</td>
								<td className='px-4 py-2 text-gray-100'>{lead.email}</td>
								<td className='px-4 py-2 text-gray-100'>{lead.source}</td>
								<td className='px-4 py-2 text-gray-100'>{lead.status}</td>
								<td className='px-4 py-2 text-gray-100'>{lead.salesRep}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className='flex justify-between items-center mt-4'>
				<button onClick={prevPage} className='bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50' disabled={currentPage === 1}>
					Previous
				</button>
				<span className='text-gray-300'>{currentPage} of {totalPages}</span>
				<button onClick={nextPage} className='bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50' disabled={currentPage === totalPages}>
					Next
				</button>
			</div>
		</motion.div>
	);
};

export default LeadManagement;
