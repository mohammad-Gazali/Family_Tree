import { Alert, Box, CircularProgress, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Tree from "react-d3-tree";
import { useQuery } from "@apollo/client";
import { DetailsCard } from "../components";
import { ALL_PERSON_QUERY, MAX_DEPTH_QUERY } from "../graphQL/queries";
import { Favorite } from "@mui/icons-material";
import finalData from "./handleChildren";
import { useEffect } from "react";


const Graph = () => {

	const [clickedPerson, setClickedPerson] = useState([false, {}]);
	const [handledData, setHandledData] = useState([]);

	const { loading: maxLoding, error: maxError, data: maxData } = useQuery(MAX_DEPTH_QUERY)
	const { loading, error, data } = useQuery(ALL_PERSON_QUERY(maxData?.aggregatePerson.depthMax));


	useEffect(() => {
		if (data && data.queryPerson) {
			setHandledData(() => finalData(data.queryPerson))
		}
	}, [data?.queryPerson])
	

	//* For Loading State
	if (loading || maxLoding){
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
	if (error || maxError) {
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
				{error ? error.message : maxError.message}
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
				{
					handledData.length !== 0
					?
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
							x: 250,
							y: 200
						}}
						enableLegacyTransitions={true}
						onNodeClick={handleNodeClick}
					/>
					:
					null
				}
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