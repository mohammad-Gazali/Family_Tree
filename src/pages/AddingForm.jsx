import { Add } from '@mui/icons-material'
import { Alert, Button, CircularProgress, Container, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AREA_QUERY } from '../graphQL/queries'
import { ADD_PERSON_MUTATION } from '../graphQL/mutations'
import { useNavigate } from 'react-router-dom'


const AddingForm = () => {

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(ALL_AREA_QUERY);
    
  const [ addPerson, info ] = useMutation(ADD_PERSON_MUTATION);
    
  const [areas, setAreas] = useState([])

  useEffect(() => {
    if (data?.queryArea) {
      setAreas(() => Array.from(data.queryArea))
    }
  }, [data])


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
      direct_children: [],
      area: {
        id: ""
      },
    };

    const keys = ['name', 'work', 'living_at', 'address', 'work1', 'work1_address', 'work2', 'work2_address', 'phone', 'cell_phone', 'work_phone', 'national_id', 'direct_children', 'area']

    
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

    //* Loop for removing empty values
    for (let i = 0; i < 14; i++) {
      if (values[keys[i]] === "" || values[keys[i]] === -1) {
        delete values[keys[i]]
      } else if (typeof values[keys[i]] === "object" && Object.keys(values[keys[i]]).length === 0) {
        delete values[keys[i]]
      }
    }

    //* Sending The Data
    try {
      const response = await addPerson({variables: {
        input: values,
      }})

    } catch (error) {
      console.log(error)
      console.log(info)
    }

    navigate('/')
    window.location.reload()
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
            <TextField variant="filled" color="secondary" name="childs" id="childs" defaultValue={"101"} select label="الأبناء">
              <MenuItem value={"101"}>wow 1</MenuItem>
              <MenuItem value={"102"}>wow 2</MenuItem>
              <MenuItem value={"103"}>wow 3</MenuItem>
              <MenuItem value={"104"}>wow 4</MenuItem>
              <MenuItem value={"105"}>wow 5</MenuItem>
            </TextField>
            {
            areas.length !== 0
            ?
            <TextField sx={{ '& *:not(style)': {fontFamily: '"Cairo", sans-serif'} }} variant="filled" color="secondary" name="area_id" id="area_id" defaultValue={areas[0].id} select label="القيد">
              {areas.map(a => {
                return <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
              })}
            </TextField>
            :
            null
            }
          </Box>
          <Button sx={{ mt: 3, fontFamily: '"Cairo", sans-serif', width: '50ch' }} color="secondary" type='submit' variant='contained' endIcon={<Add />}>
            إضافة
          </Button>
        </Box>
    </Container>
  )
}

export default AddingForm







// addPerson({ variables: { input: values } });

// (
//   input: {
//     name: "${values[0]}",
//     ${values[1] ? `work: "${values[1]}",` : "" }
//     ${values[2] ? `living_at: "${values[2]}",` : "" }
//     ${values[3] ? `address: "${values[3]}",` : "" }
//     ${values[4] ? `work1: "${values[4]}",` : "" }
//     ${values[5] ? `work1_address: "${values[5]}",` : "" }
//     ${values[6] ? `work2: "${values[6]}",` : "" }
//     ${values[7] ? `work2_address: "${values[7]}",` : "" }
//     ${values[8] ? `phone: ${values[8]},` : "" }
//     ${values[9] ? `cell_phone: ${values[9]},` : "" }
//     ${values[10] ? `work_phone: ${values[10]},` : "" }
//     ${values[11] ? `national_id: ${values[11]},` : "" }
//     ${values[13] ? `
//     area: {
//       id: "${values[13]}"
//     }
//     ` : ""
//     }
//   }
// )



//
// "Variable type provided [AddPersonInput!] is incompatible with expected type [AddPersonInput!]!
//  Variable "$input" of type "[AddPersonInput!]" used in position expecting type "[AddPersonInput!]!"."
//
//