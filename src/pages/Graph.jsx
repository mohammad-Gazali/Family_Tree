import { Alert, Box, CircularProgress, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Tree from "react-d3-tree";
import { useQuery } from "@apollo/client";
import { DetailsCard } from "../components";
import { ALL_PERSON_QUERY } from "../graphQL/queries";
import { Favorite } from "@mui/icons-material";



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


	const handleNodeClick = (e) => {
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
			<Typography bgcolor="secondary.main" display="flex" justifyContent="center" alignItems="center" gap={1} fontWeight={700} fontSize={20} width="fit-content" color="white" fontFamily="'Cairo', sans-serif" mb={4} mx="auto" textAlign="center" padding={2} borderRadius={3} boxShadow={3}>
                شجرة العائلة <Favorite />
            </Typography>
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
					onNodeClick={handleNodeClick}
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
