import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Tree from "react-d3-tree";
import finalData from "./handleChildren";

const data = finalData([
	{
		name: "John Smith",
		"National ID": "123-45-6789",
		"Phone Number": "555-555-5555",
		Work: "Construction worker",
		direct_children: [
			{
				name: "Jane Smith",
				"National ID": "987-65-4321",
				"Phone Number": "555-555-5556",
				Work: "Teacher",
				direct_children: [
					{
						name: "Mark Smith",
						"National ID": "111-11-1111",
						"Phone Number": "555-555-5557",
						Work: "Engineer",
						direct_children: [
							{
								name: "Emily Smith",
								"National ID": "222-22-2222",
								"Phone Number": "555-555-5558",
								Work: "Doctor",
								direct_children: [],
							},
						],
					},
					{
						name: "Sara Smith",
						"National ID": "333-33-3333",
						"Phone Number": "555-555-5559",
						Work: "Lawyer",
						direct_children: [
							{
								name: "David Smith",
								"National ID": "444-44-4444",
								"Phone Number": "555-555-5560",
								Work: "Accountant",
								direct_children: [],
							},
						],
					},
				],
			},
			{
				name: "Bob Smith",
				"National ID": "654-32-9876",
				"Phone Number": "555-555-5561",
				Work: "Police officer",
				direct_children: [
					{
						name: "Amy Smith",
						"National ID": "777-77-7777",
						"Phone Number": "555-555-5562",
						Work: "Nurse",
						direct_children: [],
					},
				],
			},
		],
	},
    {
		name: "John Smith",
		"National ID": "123-45-6789",
		"Phone Number": "555-555-5555",
		Work: "Construction worker",
		direct_children: [
			{
				name: "Jane Smith",
				"National ID": "987-65-4321",
				"Phone Number": "555-555-5556",
				Work: "Teacher",
				direct_children: [
					{
						name: "Mark Smith",
						"National ID": "111-11-1111",
						"Phone Number": "555-555-5557",
						Work: "Engineer",
						direct_children: [
							{
								name: "Emily Smith",
								"National ID": "222-22-2222",
								"Phone Number": "555-555-5558",
								Work: "Doctor",
								direct_children: [],
							},
						],
					},
					{
						name: "Sara Smith",
						"National ID": "333-33-3333",
						"Phone Number": "555-555-5559",
						Work: "Lawyer",
						direct_children: [
							{
								name: "David Smith",
								"National ID": "444-44-4444",
								"Phone Number": "555-555-5560",
								Work: "Accountant",
								direct_children: [],
							},
						],
					},
				],
			},
			{
				name: "Bob Smith",
				"National ID": "654-32-9876",
				"Phone Number": "555-555-5561",
				Work: "Police officer",
				direct_children: [
					{
						name: "Amy Smith",
						"National ID": "777-77-7777",
						"Phone Number": "555-555-5562",
						Work: "Nurse",
						direct_children: [],
					},
				],
			},
		],
	},
    {
		name: "John Smith",
		"National ID": "123-45-6789",
		"Phone Number": "555-555-5555",
		Work: "Construction worker",
		direct_children: [
			{
				name: "Jane Smith",
				"National ID": "987-65-4321",
				"Phone Number": "555-555-5556",
				Work: "Teacher",
				direct_children: [
					{
						name: "Mark Smith",
						"National ID": "111-11-1111",
						"Phone Number": "555-555-5557",
						Work: "Engineer",
						direct_children: [
							{
								name: "Emily Smith",
								"National ID": "222-22-2222",
								"Phone Number": "555-555-5558",
								Work: "Doctor",
								direct_children: [],
							},
						],
					},
					{
						name: "Sara Smith",
						"National ID": "333-33-3333",
						"Phone Number": "555-555-5559",
						Work: "Lawyer",
						direct_children: [
							{
								name: "David Smith",
								"National ID": "444-44-4444",
								"Phone Number": "555-555-5560",
								Work: "Accountant",
								direct_children: [],
							},
						],
					},
				],
			},
			{
				name: "Bob Smith",
				"National ID": "654-32-9876",
				"Phone Number": "555-555-5561",
				Work: "Police officer",
				direct_children: [
					{
						name: "Amy Smith",
						"National ID": "777-77-7777",
						"Phone Number": "555-555-5562",
						Work: "Nurse",
						direct_children: [],
					},
				],
			},
		],
	},
    {
		name: "John Smith",
		"National ID": "123-45-6789",
		"Phone Number": "555-555-5555",
		Work: "Construction worker",
		direct_children: [
			{
				name: "Jane Smith",
				"National ID": "987-65-4321",
				"Phone Number": "555-555-5556",
				Work: "Teacher",
				direct_children: [
					{
						name: "Mark Smith",
						"National ID": "111-11-1111",
						"Phone Number": "555-555-5557",
						Work: "Engineer",
						direct_children: [
							{
								name: "Emily Smith",
								"National ID": "222-22-2222",
								"Phone Number": "555-555-5558",
								Work: "Doctor",
								direct_children: [],
							},
						],
					},
					{
						name: "Sara Smith",
						"National ID": "333-33-3333",
						"Phone Number": "555-555-5559",
						Work: "Lawyer",
						direct_children: [
							{
								name: "David Smith",
								"National ID": "444-44-4444",
								"Phone Number": "555-555-5560",
								Work: "Accountant",
								direct_children: [],
							},
						],
					},
				],
			},
			{
				name: "Bob Smith",
				"National ID": "654-32-9876",
				"Phone Number": "555-555-5561",
				Work: "Police officer",
				direct_children: [
					{
						name: "Amy Smith",
						"National ID": "777-77-7777",
						"Phone Number": "555-555-5562",
						Work: "Nurse",
						direct_children: [],
					},
				],
			},
		],
	},
]);

const Test = () => {
	return (
		<Container sx={{ mt: 6, display: "flex", flexDirection: "column" }}>
			<Paper
				sx={{
					width: 1,
					height: "400px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					direction: "rtl",
				}}
			>
				<Tree
					data={data}
					rootNodeClassName="node__root"
					branchNodeClassName="node__branch"
					leafNodeClassName="node__leaf"
					orientation="vertical"
					pathFunc="step"
					dimensions={{
						width: 650,
						height: 200,
					}}
					nodeSize={{
						x: 200,
						y: 200,
					}}
					enableLegacyTransitions={true}
				/>
			</Paper>
		</Container>
	);
};

export default Test;
