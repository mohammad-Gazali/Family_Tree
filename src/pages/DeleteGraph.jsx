import { useMutation, useQuery } from '@apollo/client';
import { Delete, Undo } from '@mui/icons-material';
import { Alert, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import Tree from 'react-d3-tree';
import { useNavigate } from 'react-router-dom';
import { DELETE_PERSON_MUTATION } from '../graphQL/mutations';
import { ALL_PERSON_QUERY } from '../graphQL/queries';

const DeleteGraph = () => {

    const navigate = useNavigate();

    const [openWithData, setOpenWithData] = useState([false, "", ""])

    const { loading, error, data } = useQuery(ALL_PERSON_QUERY);

    const [deletePerson, info] = useMutation(DELETE_PERSON_MUTATION);

    const handleNodeClick = (e) => {
		if (e.depth) {
			setOpenWithData(() => [true, e.data.personId, e.data.personName])
		}
	};

    const handleClose = () => {
        setOpenWithData(() => [false, "", ""])
    }

    const handleDelete = async () => {
        try {
            const response = await deletePerson({variables: {
                id: openWithData[1]
            }})

            navigate('/')
            window.location.reload()

        } catch (error) {
            console.log(error)
            console.log(info)
        }
    }


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


	//* Tree Data
	const handledData = {
		name: "Family",
		children: []
	}

	data?.queryPerson.forEach((item) => {
		handledData.children.push({
			name: item.name,
			attributes: {
				id: item.id,
			},
			personId: item.id,
            personName: item.name
		})
	})

    return (
		<Container sx={{ my: 6, display: "flex", flexDirection: "column" }}>
            <Typography fontWeight={700} fontSize={20} width="fit-content" bgcolor="error.main" color="white" fontFamily="'Cairo', sans-serif" mb={4} mx="auto" textAlign="center" padding={2} borderRadius={3} boxShadow={3}>
                حذف عقدة
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
            <Dialog
                open={openWithData[0]}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '&, & *:not(style)': {
                        fontFamily: '"Cairo", sans-serif'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد من حذف {openWithData[2]} ؟
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    إن عملية الحذف لا يمكن التراجع عنها. فلذلك توخَ الحذر قبل القيام بأي عملية.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} endIcon={<Undo />}>
                        تراجع
                    </Button>
                    <Button variant='contained' onClick={handleDelete} color="error" endIcon={<Delete />}>
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
		</Container>
	);
}

export default DeleteGraph