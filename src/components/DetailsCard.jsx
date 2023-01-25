import React from 'react';
import { Button, List, ListSubheader, Paper } from '@mui/material'
import { Person, Build, LocationOn, Home, Work, Factory, WorkOutline, FactoryOutlined, Phone, Smartphone, ContactPhone, Grid3x3, CoPresent, SupervisedUserCircle } from '@mui/icons-material';
import Edit from '@mui/icons-material/Edit'
import DetailsCardItem from './DetailsCardItem';
import DetailsCardChildrenItem from './DetailsCardChildrenItem';
import { useNavigate } from 'react-router-dom';


const DetailsCard = ({ person }) => {

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${person.id}`)
  }

  return (
    <Paper sx={{  mb: 5 }}>
      <List sx={{ position: 'relative' }}>
        <Button
          sx={{ position: 'absolute', top: 8, right: 16, fontFamily: '"Cairo", sans-serif', gap: 1, display: 'flex' }}
          variant="contained"
          color="secondary"
          endIcon={<Edit sx={{ ml: -1 }} />}
          onClick={handleEdit}
        >
          تعديل
        </Button>
        <ListSubheader sx={{ fontFamily: '"Cairo", sans-serif', color: 'primary.main', fontWeight: 'bold' }} disableSticky>
          تفاصيل الشخص
        </ListSubheader>
        <DetailsCardItem icon={<Person />} text="الاسم" content={person.name} />
        <DetailsCardItem icon={<SupervisedUserCircle />} text="الأب" content={person.father?.name} />
        <DetailsCardItem icon={<Build />} text="العمل" content={person.work} />
        <DetailsCardItem icon={<LocationOn />} text="السكن" content={person.living_at} />
        <DetailsCardItem icon={<Home />} text="العنوان" content={person.address} />
        <DetailsCardItem icon={<Work />} text="العمل 1" content={person.work1} />
        <DetailsCardItem icon={<Factory />} text="عنوان العمل 1" content={person.work1_address} />
        <DetailsCardItem icon={<WorkOutline />} text="العمل 2" content={person.work2} />
        <DetailsCardItem icon={<FactoryOutlined />} text="عنوان العمل 2" content={person.work2_address} />
        <DetailsCardItem icon={<Phone />} text="رقم الهاتف" content={person.phone} />
        <DetailsCardItem icon={<Smartphone />} text="رقم الجوال" content={person.cell_phone} cellPhone={true} />
        <DetailsCardItem icon={<ContactPhone />} text="رقم العمل" content={person.work_phone} />
        <DetailsCardItem icon={<Grid3x3 />} text="الرقم الوطني" content={person.national_id} />
        <DetailsCardItem icon={<CoPresent />} text="القيد" content={person.area?.name} />
        <DetailsCardChildrenItem childs={person.direct_children} />
      </List>
    </Paper>
  )
}

export default DetailsCard