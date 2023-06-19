import React from "react";
import { Box, Typography, Paper, Grid, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const TaskSummary = ({ totalTasks, completedTasks, pendingTasks }) => {
    return (
        <Box mt={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <IconButton disabled>
                            <CheckCircleOutlineIcon color="primary" fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            {completedTasks} / {totalTasks} tareas completadas
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton disabled>
                            <HighlightOffIcon color="secondary" fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="text.secondary">
                            {pendingTasks} tareas pendientes
                        </Typography>
                    </Grid>

                </Grid>
            </Paper>
        </Box>
    );
};

