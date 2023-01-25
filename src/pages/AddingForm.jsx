import { Add } from '@mui/icons-material'
import { Alert, Button, CircularProgress, Container, MenuItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AREA_QUERY, ALL_PERSON_NAMES_IDS_DEPTH_CHILDSiDS_QUERY } from '../graphQL/queries'
import { ADD_PERSON_MUTATION, UPDATE_PERSON_MUTATION } from '../graphQL/mutations'
import { useNavigate } from 'react-router-dom'
import { getChilds, getDepth } from './figureDepthChilds'


const AddingForm = () => {

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(ALL_AREA_QUERY);
  const { loading: loading2, error: error2, data: data2 } = useQuery(ALL_PERSON_NAMES_IDS_DEPTH_CHILDSiDS_QUERY);  


  const [ addPerson, info ] = useMutation(ADD_PERSON_MUTATION);
  const [ updatePerson, info2 ] = useMutation(UPDATE_PERSON_MUTATION)


  const [areas, setAreas] = useState([])
  const [fathers, setFathers] = useState([])

  useEffect(() => {
    if (data?.queryArea) {
      setAreas(() => Array.from(data.queryArea))
    }
  }, [data])

  useEffect(() => {
    if (data2?.queryPerson) {
      setFathers(() => Array.from(data2.queryPerson))
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
				{error ? error.message : error2.message}
			</Alert>
		);
	}

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const values = {
      name: "",
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
      father: {
        id: ""
      }
    };

    const keys = ['name', 'work', 'living_at', 'address', 'work1', 'work1_address', 'work2', 'work2_address', 'phone', 'cell_phone', 'work_phone', 'national_id', 'area', 'father']

    
    //* Loop for adding the values of the form
    for (let i = 0; i < 14; i++) {
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
    let isHigh = false
    //* Loop for removing empty values
    for (let i = 0; i < 14; i++) {
      if (values[keys[i]] === "" || values[keys[i]] === -1) {
        delete values[keys[i]]
      } else if (values[keys[i]].id && values[keys[i]].id === "NON-VALUE") {
        delete values[keys[i]]
        isHigh = true
      }
    }

    let depth, fatherChilds;
    if (isHigh) {
      depth = 1
      values.high = true
    } else {
      depth = getDepth(data2.queryPerson, values["father"].id)
      fatherChilds = getChilds(data2.queryPerson, values["father"].id)
    }

    //* Sending The Data
    try {
      const response = await addPerson({variables: {
        input: { ...values, depth },
      }})

      if (fatherChilds) {
        const newFatherChilds = [...fatherChilds, { id: response.data.addPerson.person[0].id }]
  
        await updatePerson({variables: {
          id: values["father"].id,
          set: {
            direct_children: newFatherChilds
          }
        }})
      }

      navigate('/')
      window.location.reload()

    } catch (error) {
      console.log(error)
      console.log(info)
      console.log(info2)
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
            إضافة شخص
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
            <TextField variant="filled" color="secondary" name="name" id="name" label="الاسم" required />
            <TextField variant="filled" color="secondary" name="work" id="work" label="الاختصاص" />
            <TextField variant="filled" color="secondary" name="living_at" id="living_at" label="السكن" />
            <TextField variant="filled" color="secondary" name="address" id="address" label="العنوان التفصيلي" />
            <TextField variant="filled" color="secondary" name="work1" id="work1" label="العمل 1" />
            <TextField variant="filled" color="secondary" name="work1_address" id="work1_address" label="عنوان العمل 1" />
            <TextField variant="filled" color="secondary" name="work2" id="work2" label="العمل 2" />
            <TextField variant="filled" color="secondary" name="work2_address" id="work2_address" label="عنوان العمل 2" />
            <TextField variant="filled" color="secondary" name="phone" type="number" id="phone" label="الهاتف الأرضي" />
            <TextField variant="filled" color="secondary" name="cell_phone" type="number" id="cell_phone" label="الجوال الخليوي" />
            <TextField variant="filled" color="secondary" name="work_phone" type="number" id="work_phone" label="هاتف العمل" />
            <TextField variant="filled" color="secondary" name="national_id" type="number" id="national_id" label="الرقم الوطني" />
            {
              areas.length !== 0
            ?
              <TextField sx={{ '& *:not(style)': {fontFamily: '"Cairo", sans-serif !important'} }} variant="filled" color="secondary" name="area_id" id="area_id" defaultValue={areas[0].id} select label="القيد">
                {areas.map(a => {
                  return <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                })}
              </TextField>
            :
              null
            }
            {
              fathers.length !== 0
            ?
              <TextField sx={{ '& *:not(style)': {fontFamily: '"Cairo", sans-serif !important'} }} variant="filled" color="secondary" name="father_id" id="father_id" defaultValue={"NON-VALUE"} select label="الأب">
                <MenuItem value="NON-VALUE"><Typography fontFamily={'"Cairo", sans-serif !important'}>غير محدد</Typography></MenuItem>
                {fathers.map(f => {
                  return <MenuItem key={f.id} value={f.id}><Typography component="div" fontFamily={'"Cairo", sans-serif !important'}><Box display="inline-block" color="text.secondary" fontSize="12px">({f.id})</Box> {f.name}</Typography></MenuItem>
                })}
              </TextField>
            :
              null
            }
          </Box>
          <Button sx={{ mt: 3, fontFamily: '"Cairo", sans-serif', width: '50ch', '& *': { pointerEvents: 'none !important' } }} color="secondary" type='submit' variant='contained' endIcon={<Add />} onClick={(e) => { e.target.style.pointerEvents = 'none'; e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.12)'; e.target.style.color = 'rgba(0, 0, 0, 0.26)'; e.target.style.boxShadow = 'none' }}>
            إضافة
          </Button>
        </Box>
    </Container>
  )
}

export default AddingForm
