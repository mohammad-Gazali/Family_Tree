import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import { Alert, Box, Button, CircularProgress, Container, MenuItem, TextField, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ALL_AREA_QUERY, ONE_PERSON_QUERY } from '../graphQL/queries';
import { UPDATE_PERSON_MUTATION } from '../graphQL/mutations';



const EditingForm = () => {

  const navigate = useNavigate();

  const id = useParams().id;
  
  const [areas, setAreas] = useState([]);
  
  const [updatePerson, info] = useMutation(UPDATE_PERSON_MUTATION)

  const { loading: loading2, error: error2, data: data2  } = useQuery(ALL_AREA_QUERY)
  const { loading, error, data } = useQuery(ONE_PERSON_QUERY(id));


  useEffect(() => {
    if (data2?.queryArea) {
      setAreas(() => Array.from(data2.queryArea))
    }
  }, [data2])

  //* For Loading State
	if (loading || loading2){
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
	if (error || error2) {
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
			  إن المعرف الذي أدخلته غير صحيح, يرجى التأكد من صحة المعرف, ربما تكون المشكلة من الاتصال بالشبكة, يرجى التأكد من الاتصال الصحيح بها أيضاً.
			</Alert>
		);
	}

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const values = {
      work: "",
      living_at: "",
      address: "",
      work1: "",
      work1_address: "",
      work2: "",
      work2_address: "",
      phone: -1,
      cell_phone: -1,
      work_phone: -1, 
      national_id: -1,
      area: {
        id: ""
      },
    };

    const keys = ['work', 'living_at', 'address', 'work1', 'work1_address', 'work2', 'work2_address', 'phone', 'cell_phone', 'work_phone', 'national_id', 'area']

    
    //* Loop for adding the values of the form
    for (let i = 0; i < 12; i++) {
      if (typeof values[keys[i]] === "string") {
        values[keys[i]] = e.target[i].value || ""
      } else if (typeof values[keys[i]] === "number") {
        values[keys[i]] = e.target[i].value || -1 
      } else if (keys[i] === "direct_children") {
        continue
      } else {
        values[keys[i]] = { id: e.target[i].value || "" }
      }
    }

    //* Loop for removing empty values
    for (let i = 0; i < 12; i++) {
      if (values[keys[i]] === "" || values[keys[i]] === -1) {
        delete values[keys[i]]
      } else if (typeof values[keys[i]] === "object" && Object.keys(values[keys[i]]).length === 0) {
        delete values[keys[i]]
      }
    }

    //* Sending The Data
    try {
      const response = await updatePerson({variables: {
        set: values,
        id: id,
      }})

      navigate('/')
      window.location.reload()

    } catch (error) {
      console.log(error)
      console.log(info)
    }
  }

  return (
      <Container sx={{ mt: 2 }}>
          <Box 
          onSubmit={handleSubmit}
          component="form"
          sx={{
            '& > *:not(style, button)': { m: 1, fontFamily: '"Cairo", sans-serif' },
            '& label': { fontFamily: '"Cairo", sans-serif', fontSize: 14 },
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            pt: 6,
            mt: 6,
            pb: 3,
            mb: 8,
            boxShadow: 2
          }}
          >
            <Typography fontWeight={700} fontSize={20} bgcolor="primary.main" color="white" padding={2} borderRadius={3} boxShadow={3}>
              {data?.getPerson.name}
            </Typography>
            <Box sx={{
              '& *': { fontFamily: '"Cairo", sans-serif !important' },
              '& > :not(style)': { m: 1, width: '40ch'},
              '& label': { fontSize: 14 },
              '& input': { fontSize: 14 },
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <TextField defaultValue={data?.getPerson.work} variant="filled" color="secondary" name="work" id="work" label="الاختصاص" />
              <TextField defaultValue={data?.getPerson.living_at} variant="filled" color="secondary" name="living_at" id="living_at" label="السكن" />
              <TextField defaultValue={data?.getPerson.address} variant="filled" color="secondary" name="address" id="address" label="العنوان التفصيلي" />
              <TextField defaultValue={data?.getPerson.work1} variant="filled" color="secondary" name="work1" id="work1" label="العمل 1" />
              <TextField defaultValue={data?.getPerson.work1_address} variant="filled" color="secondary" name="work1_address" id="work1_address" label="عنوان العمل 1" />
              <TextField defaultValue={data?.getPerson.work2} variant="filled" color="secondary" name="work2" id="work2" label="العمل 2" />
              <TextField defaultValue={data?.getPerson.work2_address} variant="filled" color="secondary" name="work2_address" id="work2_address" label="عنوان العمل 2" />
              <TextField defaultValue={data?.getPerson.phone} variant="filled" color="secondary" name="phone" type="number" id="phone" label="الهاتف الأرضي" />
              <TextField defaultValue={data?.getPerson.cell_phone} variant="filled" color="secondary" name="cell_phone" type="number" id="cell_phone" label="الجوال الخليوي" />
              <TextField defaultValue={data?.getPerson.work_phone} variant="filled" color="secondary" name="work_phone" type="number" id="work_phone" label="هاتف العمل" />
              <TextField defaultValue={data?.getPerson.national_id} variant="filled" color="secondary" name="national_id" type="number" id="national_id" label="الرقم الوطني" />
              {
              areas.length !== 0
              ?
              <TextField sx={{ '& *:not(style)': {fontFamily: '"Cairo", sans-serif'} }} variant="filled" color="secondary" name="area_id" id="area_id" defaultValue={data?.getPerson.area?.id} select label="القيد">
                {areas.map(a => {
                  return <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                })}
              </TextField>
              :
              null
              }
            </Box>
            <Button sx={{ mt: 3, fontFamily: '"Cairo", sans-serif', width: '50ch', '& *': { pointerEvents: 'none !important' } }} color="secondary" type='submit' variant='contained' endIcon={<Edit />} onClick={(e) => { e.target.style.pointerEvents = 'none'; e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.12)'; e.target.style.color = 'rgba(0, 0, 0, 0.26)'; e.target.style.boxShadow = 'none' }}>
              تعديل
            </Button>
          </Box>
      </Container>
  )
}

export default EditingForm