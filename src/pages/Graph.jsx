import { Alert, Box, CircularProgress, Container, Paper } from "@mui/material";
import React, { useState } from "react";
import Tree from "react-d3-tree";
import { useQuery } from "@apollo/client";
import { DetailsCard } from "../components";
import { ALL_PERSON_QUERY } from "../graphQL/queries";



const Graph = () => {

	const [clickedPerson, setClickedPerson] = useState([false, {}]);
	
	const { loading, error, data } = useQuery(ALL_PERSON_QUERY);

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
					direction: "rtl"
				}}
			>
				<Tree
					data={handledData}
					rootNodeClassName="node__root"
					branchNodeClassName="node__branch"
					leafNodeClassName="node__leaf"
					orientation="vertical"
					pathFunc="step"
					dimensions={{
						width: 650,
						height: 200
					}}
					nodeSize={{
						x: 200,
						y: 200
					}}
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
