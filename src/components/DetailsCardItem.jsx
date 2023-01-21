import { Box, ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";

const DetailsCardItem = ({ icon, text, content }) => {

    if (content) {
        return (
            <Box sx={{ display: "flex" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 3,
                        width: '96px',
                        fontSize: 16,
                        borderBottom: 1,
                        borderLeft: 1,
                        borderColor: '#e0e0e0'
                    }}
                >
                    { text }
                </Box>
                <ListItemButton divider={true} >
                    <ListItemIcon>
                        { icon }
                    </ListItemIcon>
                    {content}
                </ListItemButton>
            </Box>
        );
    } 
    
    else {
        return <></>
    }
};

export default DetailsCardItem;
