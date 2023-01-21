import { ExpandLess, ExpandMore, FamilyRestroom, PersonOutline } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon } from '@mui/material'
import React, { useState } from 'react'

const DetailsCardChildrenItem = ({ childs }) => {

  const [open, setOpen] = useState(false);

  const expand = () => {
      setOpen(prestate => !prestate)
  }

  if (childs) {
    return (
      <>
      <ListItemButton onClick={expand} sx={{ position: 'relative' }}>
            <ListItemIcon>
              <FamilyRestroom />
            </ListItemIcon>
            الأبناء
            {open ? <ExpandLess sx={{ position: "absolute", left: "16px" }} /> : <ExpandMore sx={{ position: "absolute", left: "16px" }} />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              { childs.map((child) => {
                return (
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonOutline />
                    </ListItemIcon>
                    { child.name }
                  </ListItemButton>
                )
              }) }
            </List>
          </Collapse>
      </>
    )
  }

  else {
    return <></>
  }
  
}

export default DetailsCardChildrenItem