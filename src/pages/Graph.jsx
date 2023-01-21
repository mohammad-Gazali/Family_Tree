import { Alert, Box, Button, CircularProgress, Container, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import Tree from "react-d3-tree";
import { gql, useQuery } from "@apollo/client";
import { DetailsCard } from "../components";



const Graph = () => {

	const [clickedPerson, setClickedPerson] = useState([false, {}]);

	const myQuery = gql`
		query Test {
			queryPerson {
				id
				name
				work
				living_at
				address
				work1
				work1_address
				work2
				work2_address
				phone
				cell_phone
				work_phone
				national_id
				direct_children {
					id
				}
				area {
					id
					name
				}
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
		if (e.depth) {
			setClickedPerson(() => {
				return [true, e.data.personInfo]
			})
		}
	};

	//* Tree Data
	const handledData = {
		name: "Family",
		children: []
	}

	data.queryPerson.forEach((item) => {
		handledData.children.push({
			name: item.name,
			attributes: {
				id: item.id,
			},
			personInfo: item
		})
	})

	return (
		<Container sx={{ mt: 6, display: "flex", flexDirection: "column" }}>
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
			<Box sx={{
				my: 3
			}}>
				{clickedPerson[0] ? 
				<DetailsCard person={clickedPerson[1]} />
				:
				<></>
				}
			</Box>
		</Container>
	);
};

export default Graph;
