import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import Tree from "react-d3-tree";
import { gql, useQuery } from "@apollo/client";



const Graph = () => {

	const myQuery = gql`
		query Test {
			queryparent {
				id
				name
				work
			}
		}
	`;
	
	const { loading, error, data } = useQuery(myQuery);

	//* For Loading State
	if (loading){
		return (
			<CircularProgress
				color="secondary"
				sx={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}
			/>
		);
	}

	//* For Error State
	if (error) {
		return (
			<Alert
				variant="filled"
				severity="error"
				sx={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					p: 3,
					fontSize: 20,
				}}
			>
				{error.message}
			</Alert>
		);
	}

	const handle = (e) => {
		console.log(e);
	};

	console.log(data)


	//* Tree Data
	const handledData = {
		name: "Family",
		children: []
	}

	data.queryparent.forEach((item) => {
		handledData.children.push({
			name: item.name,
			attributes: {
				id: item.id,
				work: item.work
			}
		})
	})

	return (
		<Container sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
			<Button
				sx={{ ml: "auto", mb: 2 }}
				variant="contained"
				color="secondary"
				size="large"
				startIcon={<EditIcon />}
			>
				Edit
			</Button>
			<Paper
				sx={{
					width: 1,
					height: "400px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Tree
					data={handledData}
					rootNodeClassName="node__root"
					branchNodeClassName="node__branch"
					leafNodeClassName="node__leaf"
					orientation="vertical"
					pathFunc="step"
					enableLegacyTransitions={true}
					onNodeClick={handle}
				/>
			</Paper>
		</Container>
	);
};

export default Graph;
