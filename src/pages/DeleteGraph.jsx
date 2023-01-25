import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Delete, Undo, CheckCircleOutline } from '@mui/icons-material';
import { Alert, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { useNavigate } from 'react-router-dom';
import { EDIT_CHILDS_REFERENCE_MUTATION, DELETE_PERSON_MUTATION } from '../graphQL/mutations';
import { ALL_PERSON_QUERY, MAX_DEPTH_QUERY } from '../graphQL/queries';
import finalData from './handleChildren';

const DeleteGraph = () => {

    const navigate = useNavigate();

    const [openWithData, setOpenWithData] = useState([false, "", "", ""])
	const [normalOpen, setNormalOpen] = useState(false)
    const [handledData, setHandledData] = useState([]);

	const { loading: maxLoding, error: maxError, data: maxData } = useQuery(MAX_DEPTH_QUERY)
	const { loading, error, data } = useQuery(ALL_PERSON_QUERY(maxData?.aggregatePerson.depthMax));
	
	
	useEffect(() => {
		if (data && data.queryPerson) {
			setHandledData(() => finalData(data.queryPerson))
		}
	}, [data?.queryPerson])
	
    const [deletePerson, info] = useMutation(DELETE_PERSON_MUTATION);
	const [editChildrenReference, info2] = useMutation(EDIT_CHILDS_REFERENCE_MUTATION);

    const handleNodeClick = (e) => {
		if (e.depth && e.children && e.children.length !== 0) {
			setNormalOpen(() => true)
		}
		else if (e.depth) {
			setOpenWithData(() => [true, e.data.personInfo?.id, e.data.personInfo?.name, e.data.personInfo?.father?.id])
		}
	};

    const handleClose = () => {
        setOpenWithData(() => [false, "", "", ""])
    }

	const handleSecondClose = () => {
		setNormalOpen(() => false)
	}

    const handleDelete = async () => {
        try {
			
			if (openWithData[3]) {
				await editChildrenReference({
					variables: {
						id: openWithData[3],
						childId: openWithData[1]
					}
				})
			}
			
			const response = await deletePerson({variables: {
				id: openWithData[1]
			}})

            navigate('/')
            window.location.reload()

        } catch (error) {
            console.log(error)
            console.log(info)
			console.log(info2)
        }
    }


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
				{error ? error.message : maxError && maxError.message}
			</Alert>
		);
	}

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
				{
					handledData.length !== 0
					?
					<Tree
						data={handledData}
						collapsible={false}
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
					:
					null
				}
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
			<Dialog
                open={normalOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title-2"
                aria-describedby="alert-dialog-description-2"
                sx={{
                    '&, & *:not(style)': {
                        fontFamily: '"Cairo", sans-serif'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title-2">
                    عملية الحذف غير ممكنة
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description-2">
                    لا يمكنك حذف هذه العقدة. يجب عليك أن تحذف جميع العقد (الأبناء) المرتبطة بها. وبعد ذلك ستتمكن من حذف هذه العقدة.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color="warning" onClick={handleSecondClose} endIcon={<CheckCircleOutline />}>
                        حسناً
                    </Button>
                </DialogActions>
            </Dialog>
		</Container>
	);
}

export default DeleteGraph