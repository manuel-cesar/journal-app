import { TurnedInNot } from '@mui/icons-material'
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'

export const SideBar = ({ drawerWidth }) => {

    const { displayName }= useSelector( state => state.auth) 

    return (
    <Box
        component='nav'
        sx={{ width: {sm: drawerWidth }, flexShrink: {sm: 0} }}
    >
        <Drawer
            variant='permanent' //temporary si se oculta condicionalmente
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper':  { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>{ displayName }</Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Enero','Febrero','Marzo','Abril','Mayo'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>

                                <Grid container>
                                    <ListItemText primary={ text }/>
                                    <ListItemText secondary={ 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }/>
                                </Grid>
                            
            
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
